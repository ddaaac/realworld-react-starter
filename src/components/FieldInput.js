import React from 'react';

const FieldInput = ({value, onChange, placeholder, name, type, children}) => {
  return (
    <fieldset className="form-group">
      {type === "textarea" ?
        <textarea className="form-control form-control-lg" rows="8" placeholder={placeholder} name={name}
                  value={value} onChange={onChange}/>
        :
        <input className="form-control form-control-lg" type={type} placeholder={placeholder} name={name}
               value={value} onChange={onChange}/>
      }
      {children}
    </fieldset>
  );
};

export default FieldInput;
