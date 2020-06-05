import React, {useEffect} from "react";
import ArticlePreview from "../components/article/Preview";
import isEmptyObject from "../utils/util";
import Nav from "../components/nav";
import FEED_TYPE from "../components/article/FeedType";

const Home = ({articles, getArticles, feedType, setFeedType}) => {
  useEffect(() => {
    getArticles({});
  }, []);

  const onFeedTypeChange = (feedType) => {
    setFeedType(feedType);
    getArticles({my: feedType.isMy});
  };

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <Nav to="/" isActive={() => feedType === FEED_TYPE.MY}
                     onClick={() => onFeedTypeChange(FEED_TYPE.MY)}>
                  Your Feed
                </Nav>
                <Nav to={"/"} isActive={() => feedType === FEED_TYPE.GLOBAL}
                     onClick={() => onFeedTypeChange(FEED_TYPE.GLOBAL)}>
                  Global Feed
                </Nav>
              </ul>
            </div>
            {!isEmptyObject(articles) &&
            articles.map(article => <ArticlePreview key={article.slug} article={article}/>)}
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                <a href="" className="tag-pill tag-default">programming</a>
                <a href="" className="tag-pill tag-default">javascript</a>
                <a href="" className="tag-pill tag-default">emberjs</a>
                <a href="" className="tag-pill tag-default">angularjs</a>
                <a href="" className="tag-pill tag-default">react</a>
                <a href="" className="tag-pill tag-default">mean</a>
                <a href="" className="tag-pill tag-default">node</a>
                <a href="" className="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
};

export default Home;
