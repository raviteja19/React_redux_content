import * as types from '../actions/actionTypes';
import initialState from './intialstate';

export default function addOption(state = initialState.options, action) {
  switch (action.type) {
    case types.AddOption:
      return action.options;

    default:
      return state;
  }
}