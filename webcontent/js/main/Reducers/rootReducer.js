import { combineReducers } from 'redux';
import questions from './addQuestionReducer';
import options from './addOptionReducer';


const rootReducer = combineReducers({
  questions,
  options
});

export default rootReducer;