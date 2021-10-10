const { getDisplay, check } = require('../../Graph/graph.js')


const getCourseToDisplay = async (req, res) => {

    try {
        const courseArr = await getDisplay();
        console.log(courseArr)
        res.status(200).send(courseArr);
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateCheck = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        const courseArr = await check(id);
        res.status(200).send(courseArr)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }


}



module.exports = {
    getCourseToDisplay,
    updateCheck
}