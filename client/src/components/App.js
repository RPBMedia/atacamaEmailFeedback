import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from './Header';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';


class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <div className="container">
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
