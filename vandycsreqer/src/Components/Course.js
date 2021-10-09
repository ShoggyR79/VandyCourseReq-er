import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './Course.css'

export default class Course extends Component {
	render() {
		let { course } = this.props;

		return (
			<div>
				<button className={course.taken ? "btn-taken": "btn-nottaken"}>
					<div>
						{course.name}
						<input className="ml-3" type="checkbox"></input>
					</div>
				</button>
			</div>
		)
	}
}
