import './Course.css';
import ReactDOM from 'react-dom';


const states = ['blue', 'gray'];
const stateNames = ['clicked', 'nextCourse']

class Course {
	constructor(className, subsequent){

		//assign var
		this.className = className;
		this.displayState = states.clicked;
		
		//bind
		const displayStates = states.map((states) => 
		<li key={stateNames.toString()}>
			{states}
		</li>)
		
		this.show(this.displayState)
	}

	// //to display gray classes
	// constructor(className){
	// 	this.className = states.className
	// 	this.displayState = states.nextCourse
	// }

	content(){
		return <h>{this.className}</h>
	}

	show(color){
		const thisCourse = (
			<div className = 'Course'>
				<button className = "Course-Button" type="button" color={color} onclick={this.showNextCourse()}>
					{this.content()}
				</button>
			</div>
		);

		ReactDOM.render(thisCourse, document.getElementById('root'))
	}

    //displays next course in gray
	showNextCourse(){
		
	}
}