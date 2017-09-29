import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveyFormReducer from './surveyFormReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
