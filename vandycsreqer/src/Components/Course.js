import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { changeTaken, getDetails } from '../redux/actions/CourseAction';
import './Course.css'

export default class Course extends Component {


	render() {
		let { course, updateChange } = this.props;
		console.log(course.id, course.isTaken)
		return (
			<div>
				<button className={course.isTaken ? "btn-taken " + course.category : "btn-nottaken " + course.category} >
					<div>
						<h4>{"CS" + course.id}</h4>
						<p>{course.name}</p>

					</div>
					<a href={"#addApplicantModal" + course.id} className="btn btn-success" data-toggle="modal"><i className="fa fa-info-circle"></i> </a>
					<input className="ml-3" type="checkbox" onClick={() => {
						updateChange(course.id)
					}} defaultChecked={course.isTaken} ></input>
				</button>

				<div id={"addApplicantModal" + course.id} className="modal">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">{"CS" + course.id}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

