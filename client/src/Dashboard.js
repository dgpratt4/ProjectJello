import React, { Component } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar.js';
import ProjectView from './ProjectView.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    fetch(`/api/?request=userread&usern=${props.match.params.username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        this.user = user;
      })
      .catch(() => {
        console.log('User does not exist.');
      });

    this.ProjectData = [
    { 
      name: "Proj1",
      owner: {name: "Joe",  pfp: "..public/examplePfp.png"},
      members: [{name: "Joe",  pfp: "..public/examplePfp.png"},{name: "Joe",  pfp: "..public/examplePfp.png"}],
      tasks: [{ name: "Task1", description: "Desc1", assignee: {name: "Daniel",  pfp: "..public/examplePfp.png"}, hours: 5.0, status: 0},{ name: "Task2", description: "Desc2", assignee: {name: "Joe",  pfp: "..public/examplePfp.png"}, hours: 2.0, status: 1}],
      risks: [{ name: "Risk1", description: "Desc1", severity: 0}, { name: "Risk1", description: "Desc1", severity: 1}]
    },
    { 
      name: "Proj2",
      owner: {name: "Sam",  pfp: "..public/examplePfp.png"},
      members: [{name: "Joe",  pfp: "..public/examplePfp.png"},{name: "Joe",  pfp: "..public/examplePfp.png"}],
      tasks: [{ name: "BLAH", description: "Desc1", assignee: {name: "Daniel",  pfp: "..public/examplePfp.png"}, hours: 5.0, status: 1},{ name: "Task2", description: "Desc2", assignee: {name: "Joe",  pfp: "..public/examplePfp.png"}, hours: 2.0, status: 2}],
      risks: [{ name: "BLAH", description: "Desc1", severity: 0}, { name: "Risk1", description: "Desc1", severity: 1}]
    }
    ]

    this.state = {
      currentProjectArrayIndex: 0
    };
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="Sidebar">
          <Sidebar ProjectData={this.ProjectData} OnClick={this.ProjectOnClick.bind(this)} onSubmitNewProject={this.onSubmitNewProject.bind(this)} />
        </div>
        <div className="ProjectView">
        	<ProjectView ProjectData={this.ProjectData[this.state.currentProjectArrayIndex]}/>
        </div>
      </div>
    );
  }

  onSubmitNewProject(projectName) {
    fetch(`/api/?request=projectnew&usern=${this.user.name}&projn=${projectName}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((project) => {
        console.log(project);
      });
  }

  ProjectOnClick(index) {
    this.setState({
      currentProjectArrayIndex: index
    });
  }
}

export default Dashboard;
