import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ErrorComponent from "./ErrorComponent";
import Loading from "./Loading";

const Footer = (props) => {
  const {
    totalCount,
    setSortArticles,
    query,
    orderQuery,
  } = props;
  const [page, setPage] = useState(1);
  // const pages = Math.ceil(totalCount / 10);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setisLoading(true);
    getArticles("created_at", "asc", page)
      .then(({ articles}) => {
        setSortArticles(articles);
        setisLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [page]);
  if (error) {
    return <ErrorComponent message={error.message} />;
  }
  //console.log(10 * page,'<<<',totalCount)

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <section className="footer-buttons">
          <button
            className="previous-button"
            onClick={() => setPage((currentPage) => currentPage - 1)}
            disabled={page === 0}
          >
            Previous Page
          </button>
          <button
            className="next-button"
            onClick={() => setPage((currentPage) => currentPage + 1)}
            disabled={10 * page >= totalCount}
          >
            Next Page
          </button>
        </section>

        <p>&#169; Jisha</p>
      </>
    );
  }
};

export default Footer;
