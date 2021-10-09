import React from 'react'
import Course from '../Components/Course'

export default function Main() {

    let courseList = [
        [{ id: 1, name: "CS1101", isTaken: false }],

        [{ id: 1, name: "CS1104", isTaken: false },
        { id: 1, name: "CS2201", isTaken: false },
        { id: 1, name: "CS2212", isTaken: false },],

        [{ id: 1, name: "CS1151", isTaken: false },

        { id: 1, name: "CS3520", isTaken: false },]
    ]

    const renderLine = (line) => {
        return line.map((course, index) => {
            return <div className="col-4 d-flex justify-content-center" key={index}>
                <Course course={course}></Course>
            </div >
        })
    }
    const renderCourses = () => {

        return courseList.map((courses) => {
            return <div className="row d-flex justify-content-center mt-5">
                {renderLine(courses)}
            </div>
        })
    }
    return (
        <div className="container">
            <div class="navbar navbar-dark bg-dark shadow-sm">
                <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                        <i class="fas fa-laptop-code"></i>


                        <strong className="ml-2">Vanderbilt CS Course Rec</strong>
                    </a>
                    {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> */}
                </div>
            </div>
            <div className="">
                {renderCourses()}

            </div>
        </div>
    )
}
