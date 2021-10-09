import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class Course extends Component {
	render() {
		return (
			<div>
				<button>{this.show()}</button>
			</div>
		)
	}

	show(color){
		const thisCourse = (
			<div className = 'Course'>
				<button className = "Course-Button" type="button" color='blue' >
					CS1101
				</button>
			</div>
		);

		ReactDOM.render(thisCourse, document.getElementById('root'))
	}
}
