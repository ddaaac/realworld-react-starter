import React, {useEffect, useReducer} from "react";
import isEmptyObject from "../utils/util";
import ErrorMessages from "../components/ErrorMessages";
import inputReducer from "../utils/inputReducer";

const Settings = ({updateMyInfo, onLoad, myInfo, errors, onUnmounted}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  const {image, username, bio, email, password} = state;

  useEffect(() => {
    onLoad();
    return () => {
      onUnmounted();
    };
  }, []);

  useEffect(() => {
    Object.entries(myInfo)
      .forEach(([k, v]) => {
        dispatch({name: k, value: v});
      })
  }, [myInfo]);

  const onChange = (e) => {
    dispatch(e.target);
  };

  const onUpdate = (e) => {
    e.preventDefault();
    const updateData = Object.entries(state).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {});
    updateMyInfo(updateData);
  };

  return (
    !isEmptyObject(myInfo) &&
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <ErrorMessages errors={errors}/>
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input className="form-control" type="text" placeholder="URL of profile picture" name="image"
                         value={image} onChange={onChange}/>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Your Name" name="username"
                         value={username} onChange={onChange}/>
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                            name="bio" value={bio} onChange={onChange}/>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Email" name="email"
                         value={email} onChange={onChange}/>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" name="password"
                         value={password} onChange={onChange}/>
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" onClick={onUpdate}>
                  Update Settings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Settings;
