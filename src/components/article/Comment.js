import React from 'react';
import dateFormatter from "../../utils/dateFormatter";

const Comment = ({comment, username}) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <a href="" className="comment-author">
          <img src={comment.author.image} className="comment-author-img" alt="프"/>
        </a>
        &nbsp;
        <a href="" className="comment-author">{comment.author.username}</a>
        <span className="date-posted">{dateFormatter(comment.createdAt)}</span>
        {(username === comment.author.username) &&
        <span className="mod-options">
        <i className="ion-edit"/>
        <i className="ion-trash-a"/>
      </span>}
      </div>
    </div>
  );
};

export default Comment;