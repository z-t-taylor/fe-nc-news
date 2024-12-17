import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [morePages, setMorePages] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderBy, setOrderBy] = useState("DESC");
  const [sortBy, setSortBy] = useState("created_at");

  const topic = searchParams.get("topic");

  useEffect(() => {
    setSearchParams((currParams) => ({
      ...currParams,
      topic: topic,
      sortBy,
      orderBy,
    }));
  }, [topic, sortBy, orderBy]);

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);

    getArticles(topic, sortBy, orderBy)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) {
    return <p className="inline_error_and_loading">Loading..</p>;
  }

  if (isError) {
    return <p className="inline_error_and_loading">Articles not found</p>;
  }

  return (
    <section className="articles_list">
      {articles.length > 0 ? (
        <>
          <h2 id="articles_title_heading">
            {topic && topic !== "" && topic !== "null"
              ? `${topic}:`
              : "All Articles:"}
          </h2>
          <div id="container_of_order">
            <div>
              <label htmlFor="select_sort">Sort by:</label>
              <select id="select_sort" onChange={handleSort} value={sortBy}>
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comments</option>
              </select>
            </div>
            <div>
              <label htmlFor="set_order">Order by:</label>
              <button
                id="set_order"
                onClick={() => {
                  setOrderBy(orderBy === "DESC" ? "ASC" : "DESC");
                }}
              >
                {orderBy === "DESC" ? "Oldest" : "Newest"}
              </button>
            </div>
          </div>
          <ol>
            {articles
              .slice(0, morePages ? morePages : articles.length)
              .map((article) => {
                return (
                  <ArticleCard key={article.article_id} article={article} />
                );
              })}
          </ol>
          <div className="pagination_button_wrap">
            <button
              className="pagination_button"
              onClick={() => setMorePages(morePages + 5)}
            >
              More
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className="inline_error_and_loading">No articles found</p>
        </div>
      )}
    </section>
  );
};

export default ArticlesList;
