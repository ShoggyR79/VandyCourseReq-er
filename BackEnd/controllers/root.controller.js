const { getDisplay, check, getCourseDetails } = require('../../Graph/graph.js')


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
        const courseArr = await check(id);
        console.log('res', courseArr)
        res.status(200).send(courseArr)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }


}

const getCourseByDetails = async(req, res) => {
    try {
        const {id} = req.params;
        const course = await getCourseDetails(id)
        console.log('res', course)
        res.status(200).send(course)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {
    getCourseToDisplay,
    updateCheck,
    getCourseByDetails
}