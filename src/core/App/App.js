import React, { useEffect } from "react";
import Range from "components/Range";
import { MainArea, SelectionText } from "./App.styles";
import { GlobalStyles } from "../../globals.styles";
import { RANGE, SINGLE } from "../../constants";
import { fetchData } from "../../utils/fetchData";
import { useStateWithLabel } from "../../utils/hooks";

const DB_URI = "http://localhost:3051";
const dataType = "normal-range";

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
  const [rangeValues, updateRangeValues] = useStateWithLabel(
    undefined,
    "rangeValues"
  );
  const [rangeType, changeRangeType] = useStateWithLabel(RANGE, "rangeType");

  useEffect(() => {
    fetchData(`${DB_URI}/${dataType}`).then((response) => {
      if (response.success) {
        updateRangeValues(response.data);
      } else {
        console.error("Error when fetching data", response);
      }
    });
  }, []);

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
          values={rangeValues}
        />
      </MainArea>
    </>
  );
};

export default App;
