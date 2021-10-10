import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { changeTaken } from '../redux/actions/CourseAction';
import './Course.css'

export default class Course extends Component {


	render() {
		let { course, updateChange } = this.props;

		return (
			<div>
				<button className={course.isTaken ? "btn-taken " + course.category : "btn-nottaken " + course.category}>
					<div>
						<h4>{"CS" + course.id}</h4>
						<p>{course.name}</p>

					</div>
					<input className="ml-3" type="checkbox" onClick={() => {
						console.log("click")
						updateChange(course.id)
					}} defaultChecked={course.isTaken} ></input>
				</button>
			</div>
		)
	}
}

