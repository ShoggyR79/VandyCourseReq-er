import { applyMiddleware, combineReducers, createStore } from "redux"
import reduxThunk from "redux-thunk"
import { CourseReducer } from "./reducers/CourseReducer"

const rootReducer = combineReducers({
    CourseReducer,
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk))