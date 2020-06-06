import React from 'react';

const ArticleBody = ({article}) => {
  return (
    <div className="row article-content">
      <div className="col-md-12">
        {article.body}
      </div>
    </div>
  );
};

export default ArticleBody;