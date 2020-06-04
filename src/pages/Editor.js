import React, {useReducer} from "react";
import inputReducer from "../utils/inputReducer";
import FieldInput from "../components/FieldInput";
import SubmitButton from "../components/SubmitButton";

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

  const submitArticle = () => {
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
                <FieldInput type="text" name="title" placeholder="Article Title" value={title} onChange={onChange}/>
                <FieldInput type="text" name="description" value={description} onChange={onChange}
                            placeholder="What's this article about?"/>
                <FieldInput type="textarea" name="body" value={body} onChange={onChange}
                            placeholder="Write your article (in markdown)"/>
                <FieldInput type="text" name="tagList" value={tagList} onChange={onChange} placeholder="Enter tags">
                  <div className="tag-list">
                  </div>
                </FieldInput>
                <SubmitButton onSubmit={submitArticle}>Publish Article</SubmitButton>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>)
};

export default Editor;
