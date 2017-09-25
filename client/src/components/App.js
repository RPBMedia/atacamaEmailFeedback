import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from './Header';
import LandingPage from './LandingPage';

const Dashboard = () => {
  return <h2>Dashboard</h2>;
};

const SurveyNew = () => {
  return <h2>SurveyNew</h2>;
};

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}



export default connect(null, actions)(App);
