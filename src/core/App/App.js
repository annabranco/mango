import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SETUP from "config/setup.js";
import { useStateWithLabel } from "utils/hooks";
import Home from "views/Home/Home";
import NormalRange from "views/NormalRange/NormalRange";
import { RANGE } from "constants";
import { MainArea } from "./App.styles";
import { GlobalStyles } from "globals.styles";

const App = () => {
  const [currentValue, changeCurrentValue] = useStateWithLabel(
    null,
    "currentValue"
  );
  const [currentMinValue, changeCurrentMinValue] = useStateWithLabel(
    null,
    "currentMinValue"
  );
  const [currentMaxValue, changeCurrentMaxValue] = useStateWithLabel(
    null,
    "currentMaxValue"
  );

  const [rangeType, changeRangeType] = useStateWithLabel(RANGE, "rangeType");

  return (
    <>
      <GlobalStyles />
      <MainArea>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/exercise1"
              element={
                <NormalRange
                  changeCurrentMaxValue={changeCurrentMaxValue}
                  changeCurrentMinValue={changeCurrentMinValue}
                  currentMaxValue={currentMaxValue}
                  currentMinValue={currentMinValue}
                  currentValue={currentValue}
                  displayMarks={false}
                  onChange={changeCurrentValue}
                  rangeType={rangeType}
                  type={rangeType}
                  unit={SETUP.numberUnit}
                />
              }
            />
            <Route index element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </MainArea>
    </>
  );
};

export default App;
