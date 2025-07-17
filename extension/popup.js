import React from 'react';
import ReactDOM from 'react-dom';
import useFPLMe from '../src/useFPLMe.js';

function App() {
  const data = useFPLMe();
  if (!data) {
    return React.createElement('div', null, 'Loading...');
  }
  return React.createElement('pre', null, JSON.stringify(data, null, 2));
}

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);
