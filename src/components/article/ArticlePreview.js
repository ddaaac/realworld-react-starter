import React from 'react';
import ArticleHeader from "./ArticleHeader";
import SubmitButton from "../SubmitButton";
import {Link} from "react-router-dom";

const ArticlePreview = ({article, toggleFavorite}) => {
  const onSubmit = () => {
    toggleFavorite(article.slug);
  };

  return (
    <div className="article-preview">
      <ArticleHeader article={article}>
        <SubmitButton isActive={article.favorited} onSubmit={onSubmit}>
          <i className="ion-heart"/> {article.favoritesCount}
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