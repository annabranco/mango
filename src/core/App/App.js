import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SETUP from "../../config/setup.js";
import { useStateWithLabel } from "../../utils/hooks";
import Home from "../../views/Home/Home";
import RangeView from "../../views/RangeView/RangeView";
import { RANGE } from "../../constants";
import { GlobalStyles } from "../../globals.styles";
import { MainArea } from "./App.styles";

const App = () => {
  const [currentMaxValue, changeCurrentMaxValue] = useStateWithLabel(
    undefined,
    "currentMaxValue"
  );
  const [currentMinValue, changeCurrentMinValue] = useStateWithLabel(
    undefined,
    "currentMinValue"
  );
  const [currentValue, changeCurrentValue] = useStateWithLabel(
    undefined,
    "currentValue"
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
                <RangeView
                  changeCurrentMaxValue={changeCurrentMaxValue}
                  changeCurrentMinValue={changeCurrentMinValue}
                  currentMaxValue={currentMaxValue}
                  currentMinValue={currentMinValue}
                  currentValue={currentValue}
                  displayMarks={false}
                  onChange={changeCurrentValue}
                  type={rangeType}
                  unit={SETUP.numberUnit}
                />
              }
            />
            <Route
              exact
              path="/exercise2"
              element={
                <RangeView
                  changeCurrentMaxValue={changeCurrentMaxValue}
                  changeCurrentMinValue={changeCurrentMinValue}
                  currentMaxValue={currentMaxValue}
                  currentMinValue={currentMinValue}
                  currentValue={currentValue}
                  displayMarks={true}
                  onChange={changeCurrentValue}
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
