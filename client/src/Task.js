import React, { Component } from 'react';
import './Task.css';
import TaskStatus from './TaskStatus.js';
import ContentEditable from './ContentEditable.js';

class Tasks extends Component {
  constructor(props) {
  	super(props);
  }
  render() {
    return (
      <div className="Tasks">
	      <div className="Task-Row">
	      	  <div className="Task-Name-Description flex-fill">
	      	  	<div className="Task-Name">
			      <ContentEditable html={this.props.TaskData.name} onChange={this.taskNameOnChange.bind(this)} /> 
			    </div>  
			    <div className="Task-Description">
			      <ContentEditable html={this.props.TaskData.description} onChange={this.taskDescriptionOnChange.bind(this)} />
			    </div> 
			  </div>
		      <div className="Task-Status">
		      	<TaskStatus TaskId={this.props.TaskData.id} Assignee={this.props.TaskData.assignee} Hours={this.props.TaskData.hours} Status={this.props.TaskData.status} UserData= {this.props.UserData} onStatusChange={this.changeStatus.bind(this)} onAssigneeChange={this.changeAssignee.bind(this)} onHoursChange={this.changeHours.bind(this)} />
		      </div>
	      </div>
      </div>
    );
  }

  //onChangeMethods
  taskNameOnChange(event) {
	var newName = event.target.value;

	this.props.onTaskNameChange(this.props.TaskData.id, newName);
  }

  taskDescriptionOnChange(event) {
	var newDescription = event.target.value;

	this.props.onTaskDescriptionChange(this.props.TaskData.id, newDescription);
  }

  changeStatus(taskId, newStatus) {
    this.props.onStatusChange(taskId, newStatus);
  }

  changeAssignee(taskId, newName) {
    this.props.onAssigneeChange(taskId, newName);
  }

  changeHours(taskId, newHours) {
    this.props.onHoursChange(taskId, newHours);
  }
}

export default Tasks;
