import * as types from './actionTypes';

export function addQuestion(question) {
    return {type: types.AddQuestion, question};
  }
  
  export function addOption(option) {
    return {type: types.AddOption, option};
  }
  
  export function checkExistence(data)
{
  return function(dispatch)
  {
    var url = 'http://localhost:8080/api/checkuser';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), 
      credentials: 'omit',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.text())
    .catch(error => console.error('Error:', error))
    .then(response => dispatch(addOption(response)));
  }
}