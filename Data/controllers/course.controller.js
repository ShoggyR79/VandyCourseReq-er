const {Course} = require("../models")

const getAllCourses = async(req, res) => {
	try {
		const allCourses = await Course.findAll()
		res.status(200).send(allCourses)
	} catch (error) {
		res.status(500).send(error)
	}
}

const getCourseByID = async(req, res) => {
	try {
		const id = req.params.id
		const course = await Course.findByPk(id)
		res.status(200).send(course)
	} catch (error) {
		res.status(500).send(error)
	}
}

const removeCourseByID = async(req, res) => {
	try {
		const id = req.params.id
		const course = await Course.findByPk(id)
		await Course.destroy({
			where: {id,}
		})
		res.status(200).send(course)
	} catch (error) {
		res.status(500).send(error)
	}
}

const updateCourseByID = async(req, res) => {
	try {
		const id = req.params.id
		const course = await Course.findByPk(id)
		await Course.update(req.body, {
			where: {id,}
		})
		res.status(200).send(course)
	} catch (error) {
		res.status(500).send(error)
	}
}
 
module.exports = {
	getAllCourses,
	getCourseByID,
	removeCourseByID,
	updateCourseByID
}