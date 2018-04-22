import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import axios from 'axios';
import './App.css';
import ReflectionForm from '../ReflectionForm/ReflectionForm';
import ReflectionList from '../ReflectionList/ReflectionList';
import Header from '../Header/Header'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <nav>
            <ul>
              <li>
                <Link to="/">View Reflections</Link>
              </li>
              <li>
                <Link to="/addNew">Add New Reflection</Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/" component={ReflectionList}/>
          <Route path="/addNew" component={ReflectionForm}/>
        </div>
      </Router>
    );
  }
}

export default App;
