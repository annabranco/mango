import React, { useEffect, useState, useRef } from "react";
import { func, number, oneOf, shape } from "prop-types";
import ArrowLeft from "assets/images/arrow-left.png";
import ArrowRight from "assets/images/arrow-right.png";
import { RANGE, SINGLE } from "../../constants";

import { Mark, MarkLabel, RangeArea, Slider } from "./Range.styles";

const Range = ({
  changeCurrentMaxValue,
  changeCurrentMinValue,
  currentMaxValue,
  currentMinValue,
  currentValue,
  onChange,
  type,
  values,
}) => {
  const [selectionMarks, updateSelectionMarks] = useState([]);

  const valueRef = useRef();
  const minValueRef = useRef();
  const maxValueRef = useRef();
  const listenersOn = useRef();

  const onChangeSlider = (id) => {
    onChange(Number(id.replace("slider-mark-", "")));
  };

  const onSelectNewValue = (event) => {
    event.preventDefault();
    const markId = event.target.id.replace("slider-mark-", "");
    const selectorType = event.dataTransfer.getData("text");
    console.log("$$$ selectorType", selectorType);

    if (!selectorType && markId !== valueRef.current) {
      console.log("$$$ onSelectNewValue target", event.target);
      valueRef.current = markId;
      onChange(Number(markId));
    }
    if (selectorType === "min" && markId !== minValueRef.current) {
      console.log("$$$ onSelectNewValue target", event.target);
      minValueRef.current = markId;
      changeCurrentMinValue(Number(markId));
    }
    if (selectorType === "max" && markId !== maxValueRef.current) {
      console.log("$$$ onSelectNewValue target", event.target);
      maxValueRef.current = markId;
      changeCurrentMaxValue(Number(markId));
    }
  };

  const onDrag = (event) => {
    const selectorType = event.target.dataset.selectortype;
    const img = new Image();

    if (selectorType === "min") {
      img.src = ArrowRight;
      event.dataTransfer.setDragImage(img, 120, 20);
    } else if (selectorType === "max") {
      img.src = ArrowLeft;
      event.dataTransfer.setDragImage(img, 0, 20);
    } else {
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
      event.dataTransfer.setDragImage(img, 0, 0);
    }
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", event.target.dataset.selectortype);
    console.log(
      "$$$ event.target.dataset.selectortype",
      event.target.dataset.selectortype
    );
    console.log(
      "$$$ onDrag dataTransfer.getData",
      event.dataTransfer.getData("text")
    );
  };

  const onMoveSlider = (event) => {
    console.log(
      "$$$ onMoveSlider dataTransfer.getData",
      event.dataTransfer.getData("text")
    );
    event.preventDefault();
    const markId = event.target.id.replace("slider-mark-", "");
    event.dataTransfer.effectAllowed = "none";

    if (markId !== valueRef.current) {
      valueRef.current = markId;
      onChange(Number(markId));
    }
  };

  useEffect(() => {
    const { min, max, jump } = values;
    if (min && max && jump) {
      const updatedMarks = [];

      for (let i = min; i < max; i = i + jump) {
        if (i !== min && i % jump !== 0) {
          i = i - (i % jump);
        }
        updatedMarks.push(i);
      }
      updatedMarks.push(max);
      updateSelectionMarks(updatedMarks);
      onChange(min);
      if (!listenersOn.current) {
        document.addEventListener("drag", onDrag, false);
        document.addEventListener("dragstart", onDrag, false);
        document.addEventListener("drop", onSelectNewValue, false);
        document.addEventListener("dragover", onMoveSlider, false);
        // document.addEventListener("dragend", test, false);
        // document.addEventListener("dragenter", test, false);
        // document.addEventListener("dragleave", test, false);
        listenersOn.current = true;
      }
    }
    return () => {
      document.removeEventListener("drag", onDrag, false);
      document.removeEventListener("dragstart", onDrag, false);
      document.removeEventListener("drop", onSelectNewValue, false);
      document.removeEventListener("dragover", onMoveSlider, false);
      // document.removeEventListener("dragend", test, false);
      // document.removeEventListener("dragenter", test, false);
      // document.removeEventListener("dragleave", test, false);
    };
  }, []);

  const getSelectorType = (value) => {
    if (type === RANGE) {
      if (value === currentMaxValue) {
        return "max";
      }
      if (value === currentMinValue) {
        return "min";
      }
    }
    return null;
  };

  return (
    <RangeArea>
      <MarkLabel>{values.min}</MarkLabel>
      <Slider>
        {selectionMarks.map((mark) => (
          <Mark
            currentMax={type === RANGE && mark === currentMaxValue}
            currentMin={type === RANGE && mark === currentMinValue}
            currentSelection={type === SINGLE && mark === currentValue}
            draggable="true"
            key={`mark-${mark}`}
            id={`slider-mark-${mark}`}
            data-selectortype={getSelectorType(mark)}
            inRange={
              type === RANGE &&
              mark >= currentMinValue &&
              mark <= currentMaxValue
            }
            onClick={(event) =>
              type === SINGLE ? onChangeSlider(event.currentTarget.id) : null
            }
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
  changeCurrentMaxValue: func.isRequired,
  changeCurrentMinValue: func.isRequired,
  currentMaxValue: number,
  currentMinValue: number,
  currentValue: number,
  onChange: func.isRequired,
  type: oneOf([RANGE, SINGLE]),
  values: shape({
    min: number,
    max: number,
    jump: number,
  }),
};

Range.defaultProps = {
  currentMaxValue: 100,
  currentMinValue: 1,
  currentValue: 0,
  type: SINGLE,
  values: { min: 1, max: 100, jump: 10 },
};

export default Range;
