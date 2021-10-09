const {User} = require("../models")

const getAllUsers = async (req, res) =>{
	try {
		const usersList = await User.findAll();
		res.status(200).send(usersList)
	} catch (error) {
		res.status(500).send(error)
	}
}

const getUserByID = async(req, res) => {
	try {

		const id = req.params.id;
		const user = await User.findByPk(id);
		res.status(200).send(user)
	} catch (error) {
		res.status(500).send(error)
	}
}

const removeUserByID = async(req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findByPk(id);
		await User.destroy({where: {id,} })
		res.status(200).send(user)
	} catch (error) {
		res.status(500).send(error)
	}
}

const updateUserByID = async(req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findByPk(id);
		await User.update(req.body, {
			where: {id,}
		})
		res.status(200).send(user)
	} catch (error) {
		res.status(500).send(error)
	}
}


module.exports = {
	getAllUsers,
	getUserByID,
	removeUserByID,
	updateUserByID
}
