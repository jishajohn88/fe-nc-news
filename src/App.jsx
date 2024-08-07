import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import "./App.css";
import Header from "./components/Header";
import SingleArticle from "./components/SingleArticle";
import Footer from "./components/Footer";

function App() {
  return (
    <section className="article-container">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle/>}></Route>
      </Routes>
      <Footer />
    </section>
  );
}

export default App;
