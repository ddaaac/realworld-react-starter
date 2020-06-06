import React from 'react';

// default = big, primary, align right
function SubmitButton({children, onSubmit, small, big, primary, secondary, center}) {
  const onClick = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <button
      className={`btn ${small ? 'btn-sm' : 'btn-lg'} ${center ? '' : 'pull-xs-right'} ${secondary ? 'btn-secondary' : 'btn-primary'}`}
      type="button" onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SubmitButton;