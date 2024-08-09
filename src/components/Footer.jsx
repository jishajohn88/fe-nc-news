import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ErrorComponent from "./ErrorComponent";

const Footer = (props) => {

    const {articles} = props
    const [page,setPage] = useState(1)
    const pages = Math.ceil(articles.total_count / 10)
    const [articleCount,setArticlesCount] = useState([])
    const [totalcount,setTotalCount] = useState(articles.total_count)
    const [error,setError] = useState(null)
    useEffect(() => {
        getArticles( "created_at","asc",page ).then(({ articleCount, totalcount }) => {
          setArticlesCount(articleCount);
          setTotalCount(totalcount);
        }).catch((err)=>{
          setError(err)
        });
      }, [page]);
      if(error){
        return <ErrorComponent message={error.message}/>
      }
  return (
    <>
      <button
        onClick={() => setPage((currentPage) => currentPage - 1)}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => setPage((currentPage) => currentPage + 1)}
        disabled={pages * page >= articles.total_count}
      >
        Next Page
      </button>
      <p>&#169; Jisha</p>
    </>
  );
};

export default Footer;
