import React, { useEffect, useState, useRef } from "react";
import { func, number, shape } from "prop-types";
import { Mark, MarkLabel, RangeArea, Slider } from "./Range.styles";

const Range = ({ currentValue, onChange, values }) => {
  const [selectionMarks, updateSelectionMarks] = useState([]);

  const valueRef = useRef();
  const listenersOn = useRef();

  const onChangeSlider = (id) => {
    onChange(Number(id.replace("slider-mark-", "")));
  };

  const onSelectNewValue = (event) => {
    event.preventDefault();
    const markId = event.target.id.replace("slider-mark-", "");

    if (markId !== valueRef.current) {
      console.log("$$$ onSelectNewValue target", event.target);
      valueRef.current = markId;
      onChange(Number(markId));
    }
  };

  const onDrag = (event) => {
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    event.dataTransfer.setDragImage(img, 0, 0);
    event.dataTransfer.effectAllowed = "move";
  };

  const onMoveSlider = (event) => {
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

  return (
    <RangeArea>
      <MarkLabel>{values.min}</MarkLabel>
      <Slider>
        {selectionMarks.map((mark) => (
          <Mark
            currentSelection={mark === currentValue}
            draggable="true"
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
  values: { min: 1, max: 100, jump: 10 },
};

export default Range;
