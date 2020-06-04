import React from 'react';

function SubmitButton({children, onSubmit}) {
  const onClick = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default SubmitButton;