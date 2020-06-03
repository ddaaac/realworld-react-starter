import React from 'react';

function ErrorMessages({errors}) {
  return (
    errors &&
    <ul className="error-messages">
      {Object.entries(errors)
        .map(([k, v]) => <li key={k}>{k + " " + (Array.isArray(v) ? v[0] : v)}</li>)}
    </ul>
  );
}

export default ErrorMessages;