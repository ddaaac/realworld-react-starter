import React from 'react';
import ArticleHeader from "./ArticleHeader";
import SubmitButton from "../SubmitButton";
import {Link} from "react-router-dom";

const ArticlePreview = ({article}) => {
  console.log(article);
  return (
    <div className="article-preview">
      <ArticleHeader article={article}>
        <SubmitButton>
          <i className="ion-heart"/> 29
        </SubmitButton>
      </ArticleHeader>
      <Link to={{pathname: `/articles/${article.slug}`, state: {article}}} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default ArticlePreview;