const Footer = (props) => {
  const {
    page,
    setPage,
    totalCount,
  } = props;

  
    return (
      <>
        <section className="footer-buttons">
          <button
            className="previous-button"
            onClick={() => setPage((currentPage) => currentPage - 1)}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <h3>Page {page}</h3>
          <button
            className="next-button"
            onClick={() => setPage((currentPage) => currentPage + 1)}
            disabled={10 * page >= totalCount}
          >
            Next Page
          </button>
        </section>

        <p>&#169; Jisha</p>
      </>
    );
  
};

export default Footer;
