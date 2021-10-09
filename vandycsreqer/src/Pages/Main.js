import React from 'react'
import Course from '../Components/Course'

export default function Main() {

    let courseList = [
        { id: 1, name: "CS1101", isTaken: true, next: "CS2212", category:"core"},
        { id: 2, name: "CS2201", isTaken: true, next: "CS2212", category:"cybersecurity" },
        { id: 4, name: "CS2212", isTaken: false, next: "CS1111", category:"hardware"},
        { id: 5, name: "CS2212", isTaken: false, next: "CS1111", category:"softwareED"},
        { id: 6, name: "CS2212", isTaken: false, next: "CS1111", category:"gavr"},
        { id: 7, name: "CS2212", isTaken: false, next: "CS1111", category:"mlai"},
        { id: 8, name: "CS2212", isTaken: false, next: "CS1111", category:"data"},
        { id: 9, name: "CS2212", isTaken: false, next: "CS1111", category:"research"},
        { id: 9, name: "CS2212", isTaken: false, next: "CS1111", category:"netCloud"},
        { id: 9, name: "CS2212", isTaken: false, next: "CS1111", category:"seminar"},
        ]

    const renderCourses = () => {
        return courseList.map((course, index) => {
            return <div className="col-4 d-flex justify-content-center" key={index}>
                <Course course={course}></Course>
            </div >
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
            <div className="row mt-2">
                {renderCourses()}

            </div>
        </div>
    )
}
