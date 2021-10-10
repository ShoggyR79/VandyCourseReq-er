const express = require("express");
const { getCourseToDisplay, updateCheck, getCourseByDetails } = require("../controllers/root.controller");
const rootRouter = express.Router();

rootRouter.get('/getcourses', getCourseToDisplay)
rootRouter.put('/check/:id', updateCheck)
rootRouter.get('/course/:id', getCourseByDetails)



module.exports = {
    rootRouter
}