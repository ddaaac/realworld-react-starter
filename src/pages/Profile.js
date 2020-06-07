import React, {useEffect, useState} from "react";
import SubmitButton from "../components/SubmitButton";
import {useParams} from "react-router-dom";
import isEmptyObject from "../utils/util";
import Nav from "../components/nav";
import ArticlePreview from "../components/article/ArticlePreview";

const Profile = ({profile, articles, onLoading, toggleFavorite, toggleFollow}) => {
  const {username} = useParams();
  const [articleType, setArticleType] = useState("author");

  useEffect(() => {
    onLoading(username, articleType);
  }, [articleType]);

  return (
    <>
      {!isEmptyObject(profile) &&
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} className="user-img" alt="프사"/>
                <h4>{profile.username}</h4>
                <p>
                  {profile.bio}
                </p>
                <SubmitButton small isActive={profile.following} onSubmit={toggleFollow} action-btn>
                  <i className="ion-plus-round"/>
                  &nbsp;
                  Follow {profile.username}
                </SubmitButton>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <Nav to="/profiles/:username" isActive={() => articleType === "author"}
                       onClick={() => setArticleType("author")}>
                    My Articles
                  </Nav>
                  <Nav to="/profiles/:username" isActive={() => articleType === "favorited"}
                       onClick={() => setArticleType("favorited")}>
                    Favorited Articles
                  </Nav>
                </ul>
              </div>
              {!isEmptyObject(articles) &&
              articles.map(article => (
                <ArticlePreview
                  key={article.slug}
                  article={article}
                  toggleFavorite={toggleFavorite}
                />))}
            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
};

export default Profile;
