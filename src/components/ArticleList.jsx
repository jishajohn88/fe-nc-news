import { Link } from "react-router-dom"
const ArticleList = (props) => {
    const {article} = props
    return (
        <>
       <section className="article-card">
        <Link to={`/articles/${article.article_id}`}>
          <img src={article.article_img_url} />
          <h3>{article.title}</h3>
        </Link>
      </section>
        
        </>
    )
}

export default ArticleList