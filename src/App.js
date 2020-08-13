import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/layouts/Navbar";
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from "axios";
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import GithubState from "./context/github/GithubState";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);


  const showAlert = (msg, type) => {
    setAlert({ alert: { msg, type } });
    setTimeout(() => setAlert(null), 3000);
  }

  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);

    setRepos(res.data);
    setLoading(false);
  }

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    showAlert={showAlert}
                  />
                  <Users />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUserRepos={getUserRepos}
                  repos={repos}
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;