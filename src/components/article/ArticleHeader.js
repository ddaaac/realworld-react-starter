import React from 'react';
import dateFormatter from "../../utils/dateFormatter";

function ArticleHeader({article, children}) {
  return (
    <div className="article-meta">
      <a href="profile.html"><img src={article.author.image} alt="프사"/></a>
      <div className="info">
        <a href="" className="author">{article.author.username}</a>
        <span className="date">{dateFormatter(article.createdAt)}</span>
      </div>
      {children}
    </div>
  );
}

export default ArticleHeader;
