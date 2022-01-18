import React, { useState } from "react";
import Range from "components/Range";
import { MainArea, SelectionText } from "./App.styles";
import { GlobalStyles } from "../../globals.styles";

const App = () => {
  const [currentValue, changeCurrentValue] = useState();

  const changeCurrentValue2 = (value) => {
    console.log("$$$ Updated value on App state: ", value);
    changeCurrentValue(value);
  };

  return (
    <>
      <GlobalStyles />
      <MainArea>
        <SelectionText>Please select a value</SelectionText>
        <Range currentValue={currentValue} onChange={changeCurrentValue2} />
      </MainArea>
    </>
  );
};

export default App;
