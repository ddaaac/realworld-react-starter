import React from 'react';

function ErrorMessages({errors}) {
  return (
    errors &&
    <ul className="error-messages">
      {Object.entries(errors)
        .map(([k, v]) => <li key={k}>{k + " " + v[0]}</li>)}
    </ul>
  );
}

export default ErrorMessages;