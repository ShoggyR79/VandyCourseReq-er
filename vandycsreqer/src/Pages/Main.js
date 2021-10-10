import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import backgroundIMG from '../images/space1.jpg'
import { jsPDF } from 'jspdf'

import '../App.css'
import Course from '../Components/Course'
import { changeTaken, getCourses } from '../redux/actions/CourseAction'
import { printPDF, printTakenPDF } from '../services/createPDF';

export default function Main() {

    // let courseList = [
    //     [{ id: 1, name: "CS1101", isTaken: true, next: "CS2212", category: "core" },
    //     { id: 2, name: "CS2201", isTaken: true, next: "CS2212", category: "cybersecurity" },
    //     { id: 4, name: "CS2212", isTaken: false, next: "CS1111", category: "hardware" }],
    //     [{ id: 5, name: "CS2212", isTaken: false, next: "CS1111", category: "softwareED" },
    //     { id: 6, name: "CS2212", isTaken: false, next: "CS1111", category: "gavr" },
    //     { id: 7, name: "CS2212", isTaken: false, next: "CS1111", category: "mlai" },
    //     { id: 8, name: "CS2212", isTaken: false, next: "CS1111", category: "data" },
    //     { id: 9, name: "CS2212", isTaken: false, next: "CS1111", category: "research" },
    //     { id: 9, name: "CS2212", isTaken: false, next: "CS1111", category: "netCloud" },
    //     { id: 9, name: "CS2212", isTaken: false, next: "CS1111", category: "seminar" }],
    // ]

    const { courseList } = useSelector(state => state.CourseReducer)
    const dispatch = useDispatch()


    useEffect(async () => {
        dispatch(getCourses());
    }, [])

    const updateChange = (id) => {
        dispatch(changeTaken(id))
    }


    const renderLine = (line) => {
        return line.map((course, index) => {
            return <div className="col-3 d-flex justify-content-center mt-3" key={index}>
                <Course course={course} updateChange={updateChange}></Course>
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

    const generateFilePDF = () => {
        const doc = new jsPDF();
        printPDF(courseList, doc)
    }
    const generateTakenPDF = () => {
        const doc = new jsPDF();
        printTakenPDF(courseList, doc)
    }
    return (
        <div style={courseList.length < 3 ? { backgroundImage: `url(${backgroundIMG})`, height: "100%", width: "100%", position: "absolute" } : { backgroundImage: `url(${backgroundIMG})` }}>
            <div className="container">
                <div class="navbar navbar-dark bg-dark shadow-sm">
                    <div class="container d-flex justify-content-between">
                        <a href="#" class="navbar-brand d-flex align-items-center">
                            <i class="fas fa-laptop-code"></i>


                            <strong className="ml-2 mr-2">Vanderbilt Course Buddy</strong>
                            <i class="fas fa-rocket mr-5"></i>




                        </a>
                        <div className="d-flex justify-content-right d-flex justify-content-right">
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">
                                Color Code
                            </button>
                            <button className="btn btn-primary ml-3 " onClick={generateTakenPDF}>Generate Taken Courses PDF</button>
                            <button className="btn btn-success ml-3 " onClick={generateFilePDF}>Generate Possible Courses PDF</button>
                        </div>


                        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> */}
                    </div>
                </div>
                <div className="">
                    {renderCourses()}
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">COLOR CODE</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div className=" mt-2">None <button class="none"></button></div>
                                    <div className=" mt-2">Core <button class="core"></button></div>
                                    <div className=" mt-2">Hardware <button class="none"></button></div>
                                    <div className=" mt-2">Software Engineering / Design <button class="none"></button></div>
                                    <div className=" mt-2">Graphics/Animation/VR <button class="gavr"></button></div>
                                    <div className=" mt-2">Machine Learning / Artificial Intelligence <button class="mlai"></button></div>
                                    <div className=" mt-2">Data <button class="data"></button></div>
                                    <div className=" mt-2">Research <button class="research"></button></div>
                                    <div className=" mt-2">Cybersecurity <button class="cybersecurity"></button></div>
                                    <div className=" mt-2">Network / Cloud <button class="netCloud"></button></div>
                                    <div className=" mt-2">Computer Science Seminar <button class="seminar"></button></div>
                                    <div className=" mt-2">Theory <button class="theory"></button></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
