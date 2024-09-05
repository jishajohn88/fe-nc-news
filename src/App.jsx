import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import "./App.css";
import SingleArticle from "./components/SingleArticle";
import Login from "./components/Login";
import LoggedOut from "./components/LoggedOut";
import Topics from "./components/Topics";
import ArticlesByTopic from "./components/ArticlesByTopic";
import NotFoundPage from "./components/NotFound";

function App() {
  return (
    <section className="article-container">
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/articles" element={<ArticlesByTopic />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<LoggedOut />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </section>
  );
}

export default App;
