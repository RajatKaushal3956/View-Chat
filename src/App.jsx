import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';

const Login = Loadable({
    loader: () => import('./components/Login.jsx'),
    loading() {
      return <div id="page-loading">
        <div className="page-loading"></div>
      </div>
    }});
const Dashboard = Loadable({
    loader: () => import('./components/Dashboard.jsx'),
    loading() {
      return <div id="page-loading">
        <div className="page-loading"></div>
      </div>
    }});
class App extends Component {
  render() {
    return (
        <Router>
            <div id="app-content" className="app-content">
              <div id="main-content">
                  <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/Dashboard' component={Dashboard}/>
                    <Route path='/SignUp' component={Login}/>
                  </Switch>
              </div>
            </div>
        </Router>
      );
  }
}
export default App;
