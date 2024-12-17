import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";
import { UserProvider } from "./contexts/userContext";
import TopicsList from "./components/TopicsList";
import ErrorPath from "./components/ErrorPath";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="*" element={<ErrorPath />} />
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/topics" element={<TopicsList />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
