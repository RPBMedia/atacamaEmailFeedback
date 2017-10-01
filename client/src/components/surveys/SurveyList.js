import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div key={survey._id} className="card blue lighten-4">
          <div className="card-content">
            <span className="card-title white-text">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              <b>Sent on:</b> {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action flex">
            <div className="surveyResponseType">
              <span className="white-text">Yes: <b className="black-text">{survey.yes}</b></span>
            </div>
            <div className="surveyResponseType">
              <span className="white-text">No: <b className="black-text">{survey.no}</b></span>
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {

  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
