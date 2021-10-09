import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class Course extends Component {
	render() {
		let { course } = this.props;

		return (
			<div>
				<button className={course.taken ? "btn btn-success": "btn btn-warning"}>
					<div>
						{course.name}
						<input className="ml-3" type="checkbox"></input>

					</div>
				</button>
			</div>
		)
	}

}
