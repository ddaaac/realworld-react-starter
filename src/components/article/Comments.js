import React from 'react';
import Comment from "./Comment";
import isEmptyObject from "../../utils/util";
import CommentInput from "./CommentInput";

const Comments = ({comments, myInfo, addComment, deleteComment, updateComment}) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <CommentInput addComment={addComment} image={myInfo.image}/>
        {!isEmptyObject(comments) && comments.map(comment => (
          <Comment key={comment.id} comment={comment} myInfo={myInfo}
                   deleteComment={deleteComment}
                   updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;