import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import Loading from "./Loading";
import moment from "moment";

const SingleArticle = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    getArticleById(article_id).then((article) => {
      setSingleArticle(article);
      setisLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <section className="single-article">
          <article className="single-article-heading">
            <h2>{singleArticle.title}</h2>
            <img src={singleArticle.article_img_url} />
          </article>
          <article className="single-article-additional-info">
            <h3>
              Created on :{" "}
              {moment(singleArticle.created_at).format("MMMM Do YYYY")}
            </h3>
            <h4 className="single-article-topic">{singleArticle.topic}</h4>
            <p>{singleArticle.body}</p>
            <h5>
              <button className="up-arrow">{String.fromCharCode(8593)}</button> Votes 
              <button className="down-arrow">{String.fromCharCode(8595)}</button>
            </h5>
            <h5>Total Comments : {singleArticle.comment_count}</h5>
            </article>
            <article className="single-article-buttons">
           
            <button className="view-comments">View Comments</button>
            <button className="post-comment">Post comment to the article</button>
            </article>
        </section>
      </>
    );
  }
};

export default SingleArticle;
