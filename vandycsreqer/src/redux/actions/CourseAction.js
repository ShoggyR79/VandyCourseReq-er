import axios from "axios"

const url = "http://localhost:1234/api"

export const getCourses = () => {
    console.log("object")
    return async (dispatch) => {

        try {

            const result = await axios({
                url: `${url}/getcourses/`,
                method: 'GET'
            })
            console.log(result)
            dispatch({
                type: "SET_COURSES_LIST",
                courses: result.data
            })

        } catch (error) {
            console.log(error)

        }
    }
}