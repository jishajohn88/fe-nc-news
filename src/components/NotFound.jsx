import Lottie from "react-lottie";
import error from "../assets/error.json";
const NotFoundPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error,
  };

  return (
    <>
      <section className="error-section">
        <Lottie options={defaultOptions} height={400} width={400} />
        <a href="/">
          <p>Return to Home Page</p>
        </a>
      </section>
      {/* <p>{message}</p> */}
    </>
  );
};

export default NotFoundPage;
