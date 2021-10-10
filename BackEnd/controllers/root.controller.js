const {getDisplay, check} = require('../../Graph/graph.js')


const getCourseToDisplay = async(req, res) =>{
    
    try {
        const courseArr = await getDisplay();
        res.status(200).send(courseArr);
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateCheck = async(req, res) =>{
    try {
        await check();
        res.status(200).send('complete')
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getCourseToDisplay,
    updateCheck
}