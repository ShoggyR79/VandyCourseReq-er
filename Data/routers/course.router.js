const express = require("express")

const { getAllCourses, getCourseByID, removeCourseByID, updateCourseByID } = require("../controllers/course.controller")

const courseRouter = express.Router()

courseRouter.get("/", getAllCourses)
courseRouter.get("/:id", getCourseByID)
courseRouter.delete("/:id", removeCourseByID)
courseRouter.put("/:id", updateCourseByID)

module.exports = {
	courseRouter
}