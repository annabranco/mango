import React, { useEffect, useState } from "react";
import { func, number, shape } from "prop-types";
import { Mark, MarkLabel, RangeArea, Slider } from "./Range.styles";

const Range = ({ currentValue, onChange, values }) => {
  const [selectionMarks, updateSelectionMarks] = useState([]);

  const onChangeSlider = (id) => {
    onChange(Number(id.replace("slider-mark-", "")));
  };

  useEffect(() => {
    const { min, max, jump } = values;
    if (min && max && jump) {
      const updatedMarks = [];
      console.log("$$$ updatedMarks", updatedMarks);

      const numberOfMarks = Math.floor((max - min) / jump);
      console.log("$$$ numberOfPoints", numberOfMarks);
      for (let i = min; i <= numberOfMarks; i++) {
        updatedMarks.push(i);
      }
      updatedMarks.push(max);
      console.log("$$$ updatedMarks", updatedMarks);
      updateSelectionMarks(updatedMarks);
      onChange(min);
    }
  }, []);

  return (
    <RangeArea>
      <MarkLabel>{values.min}</MarkLabel>
      <Slider>
        {selectionMarks.map((mark) => (
          <Mark
            currentSelection={mark === currentValue}
            key={`mark-${mark}`}
            id={`slider-mark-${mark}`}
            onClick={(event) => onChangeSlider(event.currentTarget.id)}
            value={mark}
          >
            _
          </Mark>
        ))}
      </Slider>
      <MarkLabel>{values.max}</MarkLabel>
    </RangeArea>
  );
};

Range.propTypes = {
  currentValue: number,
  onChange: func.isRequired,
  values: shape({
    min: number,
    max: number,
    jump: number,
  }),
};

Range.defaultProps = {
  currentValue: 0,
  values: { min: 1, max: 100, jump: 1 },
};

export default Range;
