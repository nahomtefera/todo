import React, { Component } from 'react';
import './App.css';
// components
import Projects from './components/projects/projects'
import Tasks from './components/tasks/tasks'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Projects />
        <Tasks />
      </div>
    );
  }
}

export default App;
