import React, {useEffect, useState} from "react";
import ArticleHeader from "../components/article/ArticleHeader";
import SubmitButton from "../components/SubmitButton";
import {useLocation} from "react-router-dom";
import ArticleBody from "../components/article/ArticleBody";
import Comments from "../components/article/Comments";

const Article = ({articles, toggleFavorite}) => {
  const location = useLocation();
  const [article, setArticle] = useState(articles.filter(it => it.slug === location.state.article.slug)[0]);

  useEffect(() => {
    setArticle(articles.filter(it => it.slug === location.state.article.slug)[0]);
  }, [articles]);

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleHeader article={article}>
            <SubmitButton small isActive>
              <i className="ion-plus-round"/>
              &nbsp;
              Follow {article.author.username} <span className="counter">(10)</span>
            </SubmitButton>
            &nbsp;&nbsp;
            <SubmitButton small isActive={article.favorited} onSubmit={() => toggleFavorite(article.slug)}>
              <i className="ion-heart"/>
              &nbsp;
              Favorite Post <span className="counter">{article.favoritesCount}</span>
            </SubmitButton>
          </ArticleHeader>
        </div>
      </div>
      <div className="container page">
        <ArticleBody article={article}/>
        <hr/>
        <div className="article-actions">
          <ArticleHeader article={article}>
            <SubmitButton small isActive>
              <i className="ion-plus-round"/>
              &nbsp;
              Follow {article.author.username} <span className="counter">(10)</span>
            </SubmitButton>
            &nbsp;
            <SubmitButton small isActive={article.favorited} onSubmit={() => toggleFavorite(article.slug)}>
              <i className="ion-heart"/>
              &nbsp;
              Favorite Post <span className="counter">{article.favoritesCount}</span>
            </SubmitButton>
          </ArticleHeader>
        </div>
        <Comments comments={[{
          "id": 1,
          "createdAt": "2016-02-18T03:22:56.637Z",
          "updatedAt": "2016-02-18T03:22:56.637Z",
          "body": "It takes a Jacobian",
          "author": {
            "username": "jake",
            "bio": "I work at statefarm",
            "image": "https://i.stack.imgur.com/xHWG8.jpg",
            "following": false
          }
        }]}/>
      </div>
    </div>
  )
};

export default Article;
