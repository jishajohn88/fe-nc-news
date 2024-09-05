

import image from '../images/error-400.png'
const ErrorComponent = ({ message }) => {
 

  return (
    <>
    <section className="error-section">
     <img src={image}/>
      {/* <p>{message}</p> */}
      <a href="/"><p>Return to Home Page</p></a>
      </section>
     
    </>
  );
};
export default ErrorComponent;
