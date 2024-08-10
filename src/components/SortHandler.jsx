import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../../api";
import ErrorComponent from "./ErrorComponent";
import ArticleList from "./ArticleList";
import Loading from "./Loading";

const SortHandler = (props) => {
  const { searchParams, setSearchParams } = props;
  const [sortSelect, setSortSelect] = useState("created_at");
  const [orderSelect, setOrderSelect] = useState("asc");
  const additionalParams = new URLSearchParams(searchParams);

  const handleSortSelectchange = (e) => {
    const sortValue = e.target.value;
    setSearchParams({ sort_by: sortValue });
    setSortSelect(sortValue);
  };

  const handleOrderSelectChange = (e) => {
    const orderValue = e.target.value;
    setSearchParams({ order: orderValue });
    setOrderSelect(orderValue);
    additionalParams.set("order", orderValue);
    setSearchParams(additionalParams);
  };

  const setSortOrder = (direction) => {
    additionalParams.set("order", direction);
    setSearchParams(additionalParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="sort-form" onSubmit={handleSubmit}>
        <select
          id="sort-select"
          value={sortSelect}
          onChange={handleSortSelectchange}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment_Count</option>
          <option value="votes">Votes</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <select
          id="order-select"
          value={orderSelect}
          onChange={handleOrderSelectChange}
        >
          <option value="asc" onClick={() => setSortOrder("asc")}>
            ASC
          </option>
          <option value="desc" onClick={() => setSortOrder("desc")}>
            DESC
          </option>
        </select>
      </form>
    </>
  );
};

export default SortHandler;
