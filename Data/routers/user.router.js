const express = require("express");
const { getAllUsers, getUserByID, removeUserByID, updateUserByID, createUser } = require("../controllers/user.controllers");
const userRouter = express.Router();

userRouter.get("/", getAllUsers)
'url/api/users/2'
userRouter.get("/:id", getUserByID)
userRouter.delete("/:id", removeUserByID)
userRouter.put("/:id", updateUserByID)
userRouter.post("/", createUser)

module.exports = {
    userRouter
}
