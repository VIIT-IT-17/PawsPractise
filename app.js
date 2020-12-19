require("dotenv").config; 
const express = require("express");
const app = express();
const userRouter = require("./api/users/user_router");

app.use(express.json());

app.use("/api/users", userRouter)

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT,()=>{
    console.log("Server Up And Running On Port: ",PORT);
});