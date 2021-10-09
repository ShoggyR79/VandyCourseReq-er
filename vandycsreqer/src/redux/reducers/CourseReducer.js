const initialState = {
    courseList: []
}

export const CourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COURSE_LIST': {
            return { ...state, courseList: action.courses }
        }
        default:
            return { ...state }
    }
}