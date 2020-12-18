const { create, getUserById, getUsers, UpdateUser, DeleteUser } = require("./user_service");

const {genSaltSync,hashSync} = require("bcrypt");

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
    }

}