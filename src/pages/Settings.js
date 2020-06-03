import React, {useEffect} from "react";
import isEmptyObject from "../utils/util";
import useInput from "../utils/useInput";

const Settings = ({updateMyInfo, onLoad, myInfo, errors, onUnmounted}) => {
  const image = useInput("");
  const username = useInput("");
  const bio = useInput("");
  const email = useInput("");
  const password = useInput("");

  useEffect(() => {
    onLoad();
    return () => {
      onUnmounted();
    };
  }, []);

  const onUpdate = (e) => {
    e.preventDefault();
    const fields = {
      image: image.value,
      username: username.value,
      bio: bio.value,
      email: email.value,
      password: password.value,
    };
    const updateData = Object.entries(fields).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {});
    updateMyInfo(updateData);
  };

  return (
    (!isEmptyObject(myInfo) && isEmptyObject(errors)) &&
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input className="form-control" type="text" placeholder="URL of profile picture" {...image}
                         value={myInfo.image}/>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Your Name" {...username}
                         value={myInfo.username}/>
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control form-control-lg" rows="8"
                            placeholder="Short bio about you" {...bio} value={myInfo.bio}/>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Email" {...email}
                         value={myInfo.email}/>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" {...password}/>
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
