import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FIELDS from './formFields';
import { withRouter } from 'react-router-dom';
import { createSurvey } from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, createSurvey, history }) => {

  const reviewFieldList = _.map(FIELDS, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm the fields of your survey</h5>

      <div className="margin-10">
        {reviewFieldList}
      </div>

      <button className="teal btn-flat white-text" onClick={onCancel}>
        <i className="material-icons left">navigate_before</i>
        Back
      </button>

      <button
        onClick={ () => createSurvey(formValues, history) }
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">check</i>
      </button>

    </div>
  );
};

const mapStateToProps = (state) => {

  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, { createSurvey })(withRouter(SurveyFormReview));
