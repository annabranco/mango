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
          displayMarks={false}
          onChange={changeCurrentValue}
          type={rangeType}
          unit="€"
          values={{ min: 1, max: 100, jump: 1 }}
        />
      </MainArea>
    </>
  );
};

export default App;
