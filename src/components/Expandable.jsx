import { useState } from "react";

const Expandable = (props) => {
  const { isShowing } = props;

  return <>{isShowing ? props.children : null}</>;
};

export default Expandable;
