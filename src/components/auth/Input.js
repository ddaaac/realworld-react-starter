import React from 'react';

function Input({input, placeholder, type}) {
  return (
    <fieldset className="form-group">
      <input className="form-control form-control-lg" type={type}
             placeholder={placeholder}
             {...input}
      />
    </fieldset>
  );
}

export default Input;