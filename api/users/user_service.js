const pool = require("../../config/database");

module.exports = {
    create: (data, callBack)=>{
        pool.query(
            `insert into Registration(name,email,phone,password) values('`+data.name+`','`+data.email+`','`+data.phone+`','`+data.password+`')`,
            (error, results, fields) => {
                if(error) {
                  return  callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getUsers: callBack=>{
        pool.query(
            `select * from registration`,
            [],
            (error, results, fields) => {
                if(error) {
                  return  callBack(error)
                }
                return callBack(null, results);
            }

        );
    },

    getUserById: (uid, callBack)=>{
        pool.query(
            `select uid, name, email, phone, password from registration where uid = `+uid+``,
            (error, results, fields) => {
                if(error) {
                  return  callBack(error)
                }
                return callBack(null, results[0]);
            }
        );
    },

    UpdateUser: (data, callBack)=>{
        pool.query(
            `update registration set name='`+data.name+`', email='`+data.email+`', phone='`+data.phone+`', password='`+data.password+`' where uid = `+data.uid,
            (error, results, fields) => {
                if(error) {
                  return  callBack(error)
                }
                return callBack(null, results[0]);
            }
        );
    },

    DeleteUser: (data, callBack)=>{
        pool.query(
            `delete from registration where uid = `+data.uid+` `,
            (error, results, fields) => {
                if(error) {
                  return  callBack(error)
                }
                return callBack(null, results[0]);
            }
        );
    },

    LoginUser: (email,callBack) => {
        pool.query(
            `select * from registration where email = '`+email+`' ` ,
            (error,results,fields) => {
                if(error){
                    console.log(error);
                    callBack(error);
                }
                return callBack(null,results);
            }
        );
    }
}