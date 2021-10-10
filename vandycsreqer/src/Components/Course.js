import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './Course.css'

export default class Course extends Component {
	updateChange = (id, taken) => {
		console.log(id)
		console.log(taken)
	}

	render() {
		let { course } = this.props;

		return (
			<div>
				<button className={course.isTaken ? "btn-taken " + course.category : "btn-nottaken " + course.category}>
					<div>
						{course.name}
						<input className="ml-3" type="checkbox" onClick={() => {
							this.updateChange(course.id, course.isTaken)
						}} defaultChecked={course.isTaken} ></input>
					</div>
				</button>
			</div>
		)
	}
}

