import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home';
import Upload from "./components/Uploads";
import NavBar from "./components/NavBar";



import './App.css';

class App extends Component {
state={
  
}


  render() {
    return <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" render={() => <Home />} />
          <Route path="/Upload" render={() => <Upload  />} />
        </div>
      </Router>;
     
  }
}

export default App;
