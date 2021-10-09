const express = require("express");
const { getCourseToDisplay } = require("../controllers/root.controller");
const rootRouter = express.Router();

rootRouter.get('/getcourses', getCourseToDisplay)

module.exports = {
    rootRouter
}