import React from 'react'
import Course from '../Components/Course'

export default function Main() {

    let courseList = [
        { id: 1, name: "CS1101", isTaken: false },
        { id: 1, name: "CS2201", isTaken: false },
        { id: 1, name: "CS2212", isTaken: false },
    ]

    const renderCourses = () => {
        return courseList.map((course, index) => {
            return <div className="col-4" key={index}>
                <Course course={course}></Course>
            </div >
        })
    }
    return (
        <div className="container">
            <div className="row">
                {renderCourses()}

            </div>
        </div>
    )
}
