import React, { useEffect } from "react";
import { bool, func, oneOf, string } from "prop-types";

import { useStateWithLabel } from "../../utils/hooks";
import Range from "../../components/Range";
import { RANGE, SINGLE } from "../../constants";

import { BackLink, SelectionText } from "./RangeView.styles";
import { useLocation } from "react-router-dom";

const RangeView = ({ getValues, hideMarks, type, unit }) => {
  const location = useLocation();
  const DEFAULT_VALUES =
    location.pathname === "/exercise1"
      ? { min: 1, max: 10, jump: 2 }
      : {
          fixed: [0, 1, 2, 3, 4, 5],
        };

  const [currentMaxValue, changeCurrentMaxValue] = useStateWithLabel(
    DEFAULT_VALUES.max || DEFAULT_VALUES.fixed[DEFAULT_VALUES.fixed.length - 1],

    "currentMaxValue"
  );
  const [currentMinValue, changeCurrentMinValue] = useStateWithLabel(
    DEFAULT_VALUES.min || DEFAULT_VALUES.fixed[0],
    "currentMinValue"
  );
  const [currentValue, changeCurrentSingleValue] = useStateWithLabel(
    DEFAULT_VALUES.min || DEFAULT_VALUES.fixed[0],
    "currentValue"
  );
  const [rangeValues, updateRangeValues] = useStateWithLabel(
    DEFAULT_VALUES,
    "rangeValues"
  );

  useEffect(() => {
    getValues(updateRangeValues);
  }, []);

  return (
    <>
      <SelectionText data-test-id="range__instructions">
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
        hideMarks={hideMarks}
        onChange={changeCurrentSingleValue}
        type={type}
        unit={unit}
        values={rangeValues}
      />
      {type === SINGLE && (
        <SelectionText data-test-id="range__currentValue--display">
          {`Value selected: ${currentValue}${unit}`}
        </SelectionText>
      )}
      <BackLink to="/">Back</BackLink>
    </>
  );
};

RangeView.propTypes = {
  getValues: func.isRequired,
  hideMarks: bool,
  type: oneOf([RANGE, SINGLE]),
  unit: string,
};

RangeView.defaultProps = {
  hideMarks: false,
  type: SINGLE,
  unit: null,
};

export default RangeView;
