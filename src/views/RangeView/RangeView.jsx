import React, { useEffect } from "react";
import { bool, func, number, oneOf, string } from "prop-types";
import SETUP from "config/setup.js";
import { fetchData } from "utils/fetchData";
import { useStateWithLabel } from "utils/hooks";
import Range from "components/Range";
import { RANGE, SINGLE } from "constants";
import { BackLink, SelectionText } from "./RangeView.styles";
import { useLocation } from "react-router-dom";

const RangeView = ({
  changeCurrentMaxValue,
  changeCurrentMinValue,
  currentMaxValue,
  currentMinValue,
  currentValue,
  displayMarks,
  onChange,
  type,
  unit,
}) => {
  const location = useLocation();

  const [rangeValues, updateRangeValues] = useStateWithLabel(
    undefined,
    "rangeValues"
  );

  useEffect(() => {
    const endpoint =
      location.pathname === "/exercise2" ? "fixed-range" : "normal-range";
    fetchData(`${SETUP.dbUri}/${endpoint}`)
      .then((response) => {
        if (response.success) {
          updateRangeValues(response.data);
        } else {
          console.error("Error when fetching data", response);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <SelectionText>
        {type === SINGLE
          ? "Please select a value"
          : "Please select minimum and maximum values"}
      </SelectionText>
      <Range
        changeCurrentMaxValue={changeCurrentMaxValue}
        changeCurrentMinValue={changeCurrentMinValue}
        currentMaxValue={currentMaxValue}
        currentMinValue={currentMinValue}
        currentValue={currentValue}
        displayMarks={displayMarks}
        onChange={onChange}
        type={type}
        unit={unit}
        values={rangeValues}
      />
      <BackLink to="/">Back</BackLink>
    </>
  );
};

RangeView.propTypes = {
  changeCurrentMaxValue: func.isRequired,
  changeCurrentMinValue: func.isRequired,
  currentMaxValue: number,
  currentMinValue: number,
  currentValue: number,
  displayMarks: bool,
  onChange: func.isRequired,
  type: oneOf([RANGE, SINGLE]),
  unit: string,
};

RangeView.defaultProps = {
  currentMaxValue: 100,
  currentMinValue: 1,
  currentValue: 0,
  displayMarks: true,
  type: SINGLE,
  unit: null,
};

export default RangeView;
