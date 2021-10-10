const express = require("express");
const { getCourseToDisplay, updateCheck } = require("../controllers/root.controller");
const rootRouter = express.Router();

rootRouter.get('/getcourses', getCourseToDisplay)
rootRouter.put('/check/:id', updateCheck)



module.exports = {
    rootRouter
}