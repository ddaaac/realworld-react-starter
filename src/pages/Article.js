import React, {useEffect, useState} from "react";
import ArticleHeader from "../components/article/ArticleHeader";
import SubmitButton from "../components/SubmitButton";
import {useLocation} from "react-router-dom";
import ArticleBody from "../components/article/ArticleBody";
import Comments from "../components/article/Comments";

const Article = ({articles, toggleFavorite, addComment, getComments, deleteComment, myInfo}) => {
  const location = useLocation();
  const [article, setArticle] = useState(articles.filter(it => it.slug === location.state.article.slug)[0]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setArticle(articles.filter(it => it.slug === location.state.article.slug)[0]);
  }, [articles]);

  useEffect(() => {
    const getCommentsOnLoad = async () => {
      setComments(await getComments(article.slug));
    };
    getCommentsOnLoad();
  }, []);

  const onAddComment = async (body) => {
    setComments([...comments, await addComment(article.slug, body)]);
  };

  const onDeleteComment = async (id) => {
    await deleteComment(article.slug, id);
    setComments(comments.filter(comment => comment.id !== id));
  };

  const onUpdateComment = async (id, body) => {
    await deleteComment(article.slug, id);
    await addComment(article.slug, body);
    setComments(comments.map(comment => {
      return comment.id === id ? {...comment, body} : comment;
    }));
  };

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
        <Comments
          comments={comments}
          addComment={onAddComment}
          deleteComment={onDeleteComment}
          updateComment={onUpdateComment}
          myInfo={myInfo}
        />
      </div>
    </div>
  )
};

export default Article;
