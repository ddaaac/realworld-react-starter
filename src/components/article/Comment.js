import React, {useState} from 'react';
import dateFormatter from "../../utils/dateFormatter";
import CommentInput from "./CommentInput";

const Comment = ({comment, myInfo, deleteComment, updateComment}) => {
  const [isEdit, setIsEdit] = useState(false);

  const onUpdateComment = async (body) => {
    updateComment(comment.id, body);
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit === false &&
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
          {(myInfo.username === comment.author.username) &&
          <span className="mod-options">
          <i className="ion-edit" onClick={() => setIsEdit(!isEdit)}/>
          <i className="ion-trash-a" onClick={() => deleteComment(comment.id)}/>
        </span>}
        </div>
      </div>
      }
      {isEdit === true &&
      <CommentInput image={myInfo.image} addComment={onUpdateComment} value={comment.body}/>
      }
    </>
  );
};

export default Comment;