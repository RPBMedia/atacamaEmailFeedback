import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmail';
import FIELDS from './formFields';

class SurveyForm extends Component {

  renderFormFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return <Field key={name} component = {SurveyField} type="text" name={name} label={label} />
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          <div className="margin-10">
            {this.renderFormFields()}
          </div>

          <Link to="/surveys" className="red btn-flat white-text">
            <i className="material-icons left">cancel</i>
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">navigate_next</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {

  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(FIELDS, ({ name, error }) => {
    if(!values[name]){
      errors[name] = error
    }
  });

  return errors;

}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
