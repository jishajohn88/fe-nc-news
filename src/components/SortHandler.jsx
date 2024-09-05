const SortHandler = (props) => {
  const { searchParams, setSearchParams } = props;
  const additionalParams = new URLSearchParams(searchParams);
  const handleSortSelectchange = (e) => {
    e.preventDefault();
    const sortValue = e.target.value;
    setSearchParams({ sort_by: sortValue });
  };

  const handleOrderSelectChange = (e) => {
    e.preventDefault();
    const orderValue = e.target.value;
    setSearchParams({ order: orderValue });
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
          value={searchParams.get("sort_by") || ""}
          onChange={handleSortSelectchange}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <select
          id="order-select"
          value={searchParams.get("order") || ""}
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
