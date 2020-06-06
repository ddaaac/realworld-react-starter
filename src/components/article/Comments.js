import React from 'react';
import SubmitButton from "../SubmitButton";
import * as PropTypes from "prop-types";
import Comment from "./Comment";

const Comments = ({comments, submitComment, username}) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <form className="card comment-form">
          <div className="card-block">
            <textarea className="form-control" placeholder="Write a comment..." rows="3"/>
          </div>
          <div className="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>
            <SubmitButton small isActive>
              Post Comment
            </SubmitButton>
          </div>
        </form>
        {comments.map(comment => (
          <Comment comment={comment} username={username}/>
        ))}
      </div>
    </div>
  );
};

Comments.propTypes = {comments: PropTypes.any}

export default Comments;