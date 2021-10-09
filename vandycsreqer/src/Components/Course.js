import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class Course extends Component {
	render() {
		return (
			<div>
				{this.show('blue')}
			</div>
		)
	}

	show(color){
		const thisCourse = (
			<button className = "Course-Button" type="button" color={color} >
				<div>
				CS1101
				</div>
			</button>
		);

		ReactDOM.render(thisCourse, document.getElementById('root'))
	}
}
