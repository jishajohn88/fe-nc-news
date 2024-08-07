import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import "./App.css";
import Header from "./components/Header";
import SingleArticle from "./components/SingleArticle";
import Footer from "./components/Footer";
import Login from "./components/Login";
import LoggedOut from "./components/LoggedOut";

function App() {
  return (
    <section className="article-container">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/logout" element={<LoggedOut/>}></Route>
      </Routes>
      <Footer />
    </section>
  );
}

export default App;
