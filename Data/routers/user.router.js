const express = require("express");
const { getAllUsers, getUserByID, removeUserByID, updateUserByID } = require("../controllers/user.controllers");
const userRouter = express.Router();

userRouter.get("/", getAllUsers)
'url/api/users/2'
userRouter.get("/:id", getUserByID)
userRouter.delete("/:id", removeUserByID)
userRouter.put("/:id", updateUserByID)

module.exports = {
    userRouter
}
