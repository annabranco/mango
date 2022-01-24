/* global SERVER_URL */

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { fetchData } from "../../utils/fetchData.js";
import Home from "../../views/Home/Home";
import RangeView from "../../views/RangeView/RangeView";
import { RANGE } from "../../constants";

import { GlobalStyles } from "../../globals.styles";
import { MainArea } from "./App.styles";

const App = () => {
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
                  getValues={fetchData(`${SERVER_URL}/normal-range`)}
                  hideMarks
                  type={RANGE}
                  unit="€"
                />
              }
            />
            <Route
              exact
              path="/exercise2"
              element={
                <RangeView
                  getValues={fetchData(`${SERVER_URL}/fixed-range`)}
                  type={RANGE}
                  unit="€"
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
