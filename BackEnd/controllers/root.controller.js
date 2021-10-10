const {getDisplay} = require('../../Graph/graph.js')


const getCourseToDisplay = async(req, res) =>{
    
    try {
        const courseArr = await getDisplay();
        res.status(200).send(courseArr);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getCourseToDisplay
}