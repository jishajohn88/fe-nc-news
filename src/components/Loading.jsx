import Lottie from "react-lottie";
import loader from "../assets/loading.json";
const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
  };
  return (
    <>
      <h1>
        Please hold on, we're gathering your data. This might take a minute!
      </h1>
      <Lottie options={defaultOptions} height={400} width={400} />
    </>
  );
};

export default Loading;
