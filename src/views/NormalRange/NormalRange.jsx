import React, { useEffect } from "react";
import { bool, func, number, oneOf, shape, string } from "prop-types";
import SETUP from "config/setup.js";
import { fetchData } from "utils/fetchData";
import { useStateWithLabel } from "utils/hooks";
import { SelectionText } from "core/App/App.styles";
import Range from "components/Range";
import { RANGE, SINGLE } from "constants";

const NormalRange = ({
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
  const [rangeValues, updateRangeValues] = useStateWithLabel(
    undefined,
    "rangeValues"
  );

  useEffect(() => {
    fetchData(`${SETUP.dbUri}/normal-range`)
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
    </>
  );
};

NormalRange.propTypes = {
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

NormalRange.defaultProps = {
  currentMaxValue: 100,
  currentMinValue: 1,
  currentValue: 0,
  displayMarks: true,
  type: SINGLE,
  unit: null,
};

export default NormalRange;
