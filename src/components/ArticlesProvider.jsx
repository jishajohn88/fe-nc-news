import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";
import ArticleList from "./ArticleList";
import { useSearchParams } from "react-router-dom";
import SortHandler from "./SortHandler";
import Footer from "./Footer"

const ArticlesProvider = () =>{
    const [searchParams, setSearchParams] = useSearchParams();

    const [articles,setArticles] = useState([])
    const [error, setError] = useState(null);
    const sortByQuery = searchParams.get("sort_by");
    const orderQuery = searchParams.get("order");
    const [isLoading, setisLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(null);
   

    useEffect(() => {
        setisLoading(true);
        getArticles(sortByQuery, orderQuery, page)
          .then((data) => {
            setArticles(data.articles);
            setTotalCount(data.total_count);
            setisLoading(false);
          })
          .catch((err) => {
            setError(err);
          });
      }, [sortByQuery, orderQuery, page]);


      if (error) {
        return <ErrorComponent message={error.message} />;
      }
      
      if (isLoading) {
        return <Loading />;
      }
    return(
        <>
        <SortHandler searchParams={searchParams} setSearchParams={setSearchParams}/>
        <ArticleList articles={articles}/>
        <Footer page={page} setPage={setPage} totalCount={totalCount}/> 
        </>
    )
}

export default ArticlesProvider