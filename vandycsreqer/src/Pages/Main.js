import React from 'react'
import Course from '../Components/Course'

export default function Main() {

    let courseList = [
        { id: 1, name: "CS1101", isTaken: false, next: "CS2212", category:"core"},
        { id: 2, name: "CS2201", isTaken: true, next: "CS2212", category:"ai" },
        
        { id: 3, name: "CS2212", isTaken: false, next: "CS1111", category:"web"},
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
