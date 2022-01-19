import React, { useState } from "react";
import Range from "components/Range";
import { MainArea, SelectionText } from "./App.styles";
import { GlobalStyles } from "../../globals.styles";
import { RANGE, SINGLE } from "../../constants";

const App = () => {
  const [currentValue, changeCurrentValue] = useState();
  const [currentMinValue, changeCurrentMinValue] = useState();
  const [currentMaxValue, changeCurrentMaxValue] = useState();
  const [rangeType, changeRangeType] = useState(RANGE);

  const changeCurrentValue2 = (value) => {
    console.log("$$$ Updated value on App state: ", value);
    changeCurrentValue(value);
  };

  return (
    <>
      <GlobalStyles />
      <MainArea>
        <SelectionText>
          {rangeType === SINGLE
            ? "Please select a value"
            : "Please select minimum and maximum values"}
        </SelectionText>
        <Range
          changeCurrentMaxValue={changeCurrentMaxValue}
          changeCurrentMinValue={changeCurrentMinValue}
          currentMaxValue={currentMaxValue}
          currentMinValue={currentMinValue}
          currentValue={currentValue}
          onChange={changeCurrentValue2}
          type={rangeType}
        />
      </MainArea>
    </>
  );
};

export default App;
