import * as types from '../actions/actionTypes';
import initialState from './intialstate';

export default function addQuestion(state = initialState.questions, action) {
  switch (action.type) {
    case types.AddQuestion:
      return action.question;

    default:
      return state;
  }
}