import React, { Component } from 'react';
import './ProjectView.css';
import TasksView from './TasksView.js'
import ProjectInfoView from './ProjectInfoView.js'
import RisksView from './RisksView.js'

class ProjectView extends Component {
  constructor(props) {
  	super(props);

    this.state = {
      TasksData: []
    };

    Promise.all(this.props.ProjectData.tasks.map(taskId => {
      return fetch(`/api/?request=taskread&projId=${this.props.ProjectData.id}&taskId=${taskId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => response.json());
    }))
      .then((tasks) => {
        this.setState({
          TasksData: tasks
        });
      });
  }

  render() {
    return (
      <div className="ProjectView">
        <ProjectInfoView/>
        <TasksView TasksData= {this.state.TasksData} onSubmitNewTask={this.props.onSubmitNewTask}/>
        <RisksView RisksData= {this.props.ProjectData.risks}/>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ProjectData.tasks === this.props.ProjectData.tasks) {
      return;
    }

    Promise.all(nextProps.ProjectData.tasks.map(taskId => {
      return fetch(`/api/?request=taskread&projId=${nextProps.ProjectData.id}&taskId=${taskId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => response.json());
    }))
      .then((tasks) => {
        this.setState({
          TasksData: tasks
        });
      });    
  }
}

export default ProjectView;
