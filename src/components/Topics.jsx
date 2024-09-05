import { useEffect, useState } from "react";
import { getTopics } from "../../api";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import Header from "./Header";

const Topics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((data) => {
        setTopicsList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <Header />
        <section className="topics-list">
          <ul>
            {topicsList.map((topic) => {
              return (
                <li key={topic.slug}>
                  <Link to={`/articles?topic=${topic.slug}`}>
                    <button>{topic.slug.toUpperCase()}</button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </>
    );
  }
};

export default Topics;
