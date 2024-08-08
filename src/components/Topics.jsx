import { useEffect, useState } from "react";
import { getTopics } from "../../api";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Topics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((data) => {
        setTopicsList(data)
        setIsLoading(false)
    });
  },[]);

  if (isLoading) {
    return <Loading />;
  } else {
    return( 
    <>
    <section className="topics-list">
        <ul>
           {topicsList.map((topic) => {
            return (
                <li key={topic.slug}>
                    <Link to={`/articles?topic=${topic.slug}`}><button>{(topic.slug).toUpperCase()}</button>
                    </Link></li>
            )
           })}
        </ul>
    </section>
    </>)
  }
};

export default Topics;
