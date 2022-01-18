import React from "react";
import { string } from "prop-types";

const App = ({ key }) => {
  return <p>App working!</p>;
};

App.propTypes = {
  key: string,
};

App.defaultProps = {
  key: undefined,
};

export default App;
