const { create, getUserById, getUsers, UpdateUser, DeleteUser, LoginUser } = require("./user_service");

const {genSaltSync,hashSync,compareSync} = require("bcrypt");

const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);

        create(body, (err,results)=> {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error"
                });
            }
            return res.status(200).json({
                success:1,
                data : results
            })
        }
        );
    },

    getUserById: (req,res)=>{
        const uid = req.params.uid;

        getUserById(uid,(err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success : 0,
                    message : "Record not Found"
                });
            }
            return res.json({
                success : 1,
                data : results
            })
        });
    },

    getUsers: (req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success : 0,
                    message : "no user exists"
                });
            }
            return res.json({
                success : 1,
                data : results
            });
        });
    },

    UpdateUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);

        UpdateUser(body, (err,results) => {
            if(err){
                console.log(err.message);
                return res.json({"error":err.message});
            }
            return res.json({
                success : 1,
                message : "User Updated Successfully"
            });
        });
    },

    DeleteUser: (req,res)=>{
        const data = req.body;

        DeleteUser(data,(err,results)=>{
            // if(err){
            //     console.log(err);
            //     return;
            // }

            if(err){
                console.log(err);
                return res.json({
                    success : 0,
                    message : err.message
                });
            }

            return res.json({
                success:1,
                message:"user deleted successfully"
            });
        });
    },
 
    LoginUser : (req,res) => {
        const body = req.body;
        LoginUser(body.email, (err,results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success : 0,
                    data : "Invalid email or password"
                });
            }
            console.log(results);
            const result = compareSync(body.password,results[0].password);
            console.log(body.password);
            console.log(results[0].password);
            console.log(result);
            if(result){
                result.password = undefined;
                const jsontoken = sign({ result: results}, "pawsproject", {
                    expiresIn : "1h"
                });
                return res.json({
                    success:1,
                    message:"Logged in Successfully",
                    token: jsontoken
                });
            }
            else{
                return res.json({
                    success:0,
                    data : "Invalid Email or Password"
                });
            }
        } );
    },


}