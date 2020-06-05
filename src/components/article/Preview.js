import React from 'react';
import SubmitButton from "../SubmitButton";

const Preview = ({article}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    new Intl.DateTimeFormat('en', {month: "numeric", day: "numeric"}).format(date);
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html"><img src={article.author.image} alt="프사"/></a>
        <div className="info">
          <a href="" className="author">{article.author.username}</a>
          <span className="date">{formatDate(article.createdAt)}</span>
        </div>
        <SubmitButton>
          <i className="ion-heart"/> 29
        </SubmitButton>
      </div>
      <a href="" className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
};

export default Preview;