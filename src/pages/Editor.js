import React, {useReducer} from "react";
import inputReducer from "../utils/inputReducer";

const Editor = ({createArticle}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    title: "",
    description: "",
    body: "",
    tagList: "",
  });

  const {title, description, body, tagList} = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  const onClick = (e) => {
    e.preventDefault();
    const data = {
      ...state,
      tagList: tagList.replace(" ", "").split(","),
    };
    createArticle(data);
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" name="title" value={title} onChange={onChange}
                         className="form-control form-control-lg"
                         placeholder="Article Title"/>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" name="description" value={description} onChange={onChange} className="form-control"
                         placeholder="What's this article about?"/>
                </fieldset>
                <fieldset className="form-group">
                  <textarea name="body" value={body} onChange={onChange} className="form-control" rows="8"
                            placeholder="Write your article (in markdown)"/>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" name="tagList" value={tagList} onChange={onChange}
                         placeholder="Enter tags"/>
                  <div className="tag-list">
                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={onClick}>
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>)
};

export default Editor;
