import React, {useEffect, useReducer} from 'react';
import SubmitButton from "../SubmitButton";
import inputReducer from "../../utils/inputReducer";

const CommentInput = ({image, addComment, value}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    content: "",
  });

  useEffect(() => {
    if (value) {
      dispatch({name: "content", value});
    }
  }, []);

  const {content} = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  const onAddComment = () => {
    addComment(content);
    dispatch({name: "content", value: ""});
  };

  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea name="content" value={content} onChange={onChange} className="form-control"
                  placeholder="Write a comment..." rows="3"/>
      </div>
      <div className="card-footer">
        <img src={image} className="comment-author-img"/>
        <SubmitButton small isActive onSubmit={onAddComment}>
          Post Comment
        </SubmitButton>
      </div>
    </form>
  )
};

export default CommentInput;