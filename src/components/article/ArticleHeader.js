import React from 'react';
import dateFormatter from "../../utils/dateFormatter";
import {Link} from "react-router-dom";

function ArticleHeader({article, children}) {
  return (
    <div className="article-meta">
      <Link to={`/profiles/${article.author.username}`}><img src={article.author.image} alt="프사"/></Link>
      <div className="info">
        <Link to={`/profiles/${article.author.username}`} className="author">{article.author.username}</Link>
        <span className="date">{dateFormatter(article.createdAt)}</span>
      </div>
      {children}
    </div>
  );
}

export default ArticleHeader;
