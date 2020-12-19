const { 
    createUser, 
    getUserById, 
    getUsers, 
    UpdateUser, 
    DeleteUser,
    LoginUser
 } = require("./user_controller");

const express = require('express');
const router = express.Router();

router.post("/",createUser);
router.post("/login",LoginUser);

router.get("/:id",getUserById);
router.get("/",getUsers);

router.patch("/",UpdateUser);

router.delete("/",DeleteUser);


module.exports = router;
