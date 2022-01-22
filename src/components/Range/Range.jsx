import React, { useEffect } from "react";
import { bool, func, number, oneOf, shape, string } from "prop-types";
import { BLANK_IMG, MAX, MIN, RANGE, SINGLE } from "../../constants";
import { useRefWithLabel, useStateWithLabel } from "../../utils/hooks";
import { Mark, MarkInput, MarkLabel, RangeArea, Slider } from "./Range.styles";

const Range = ({
  changeCurrentMaxValue,
  changeCurrentMinValue,
  currentMaxValue,
  currentMinValue,
  currentValue,
  displayMarks,
  onChange,
  type,
  unit,
  values,
}) => {
  const [editMax, updateEditMax] = useStateWithLabel(null, "editMax");
  const [editMin, updateEditMin] = useStateWithLabel(null, "editMin");
  const [selectionMarks, updateSelectionMarks] = useStateWithLabel(
    [],
    "selectionMarks"
  );

  const listenersOn = useRefWithLabel(null, "listenersOn");
  const maxValueRef = useRefWithLabel(values.max, "maxValueRef");
  const minValueRef = useRefWithLabel(values.min, "minValueRef");
  const selectorBeingDragged = useRefWithLabel(null, "selectorBeingDragged");
  const valueRef = useRefWithLabel(null, "valueRef");

  //-- Logics for SINGLE value
  const onClickSlider = (id) => {
    if (type === SINGLE) {
      onChange(Number(id.replace("slider-mark-", "")));
    }
  };

  const onMoveSlider = (event) => {
    event.preventDefault();
    const markId = event.target.id.replace("slider-mark-", "");
    event.dataTransfer.effectAllowed = "none";

    if (type === SINGLE && markId !== valueRef.current) {
      valueRef.current = markId;
      onChange(Number(markId));
    }
  };

  //-- Logics for RANGE values
  const getSelectorType = (value) => {
    if (type === RANGE) {
      if (value === currentMaxValue) {
        return MAX;
      }
      if (value === currentMinValue) {
        return MIN;
      }
    }
    return null;
  };

  const onChangeInput = (inputType, value) => {
    if (inputType === MIN) {
      updateEditMin(Number(value));
    } else if (inputType === MAX) {
      updateEditMax(Number(value));
    }
  };

  const onConfirmInputChange = (inputType) => {
    let newValue;

    if (inputType === MIN) {
      newValue = roundValue(editMin, inputType);
      minValueRef.current = newValue;
      changeCurrentMinValue(newValue);
      updateEditMin(null);
    } else if (inputType === MAX) {
      newValue = roundValue(editMax, inputType);
      maxValueRef.current = newValue;
      changeCurrentMaxValue(newValue);
      updateEditMax(null);
    }
  };

  const roundValue = (valueToCheck, inputType) => {
    const { jump, max, min } = values;
    const minValue = minValueRef.current;
    const maxValue = maxValueRef.current;

    if (valueToCheck >= maxValue) {
      if (inputType === MIN) {
        return maxValue - jump;
      }
      return maxValue;
    }
    if (valueToCheck < minValue) {
      if (inputType === MAX) {
        return minValue + jump;
      }
      return minValue;
    }
    if (valueToCheck % jump !== 0) {
      const correctedValue = valueToCheck - (valueToCheck % jump);
      if (correctedValue <= min) {
        return min;
      }
      return correctedValue;
    }
    return valueToCheck;
  };

  // ---- Dragging events (RANGE)
  const addListeners = () => {
    document.addEventListener("drag", onDrag, false);
    document.addEventListener("dragstart", onDrag, false);
    document.addEventListener("drop", onFinishDragging, false);
    document.addEventListener("dragover", onMoveSlider, false);
    document.addEventListener("dragenter", onDragOver, false);
    listenersOn.current = true;
  };
  const removeListeners = () => {
    document.removeEventListener("drag", onDrag, false);
    document.removeEventListener("dragstart", onDrag, false);
    document.removeEventListener("drop", onFinishDragging, false);
    document.removeEventListener("dragover", onMoveSlider, false);
    document.removeEventListener("dragenter", onDragOver, false);
    listenersOn.current = false;
  };

  const onDrag = (event) => {
    const img = new Image();

    img.src = BLANK_IMG;
    event.dataTransfer.setDragImage(img, 0, 0);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", event.target.dataset.selectortype);

    if (!selectorBeingDragged.current) {
      selectorBeingDragged.current = event.target.dataset.selectortype;
    }
  };

  const getPreviousValue = (comparedValue, fixedArray) =>
    fixedArray[fixedArray.findIndex((value) => value === comparedValue) - 1];

  const getNextValue = (comparedValue, fixedArray) =>
    fixedArray[fixedArray.findIndex((value) => value === comparedValue) + 1];

  const onDragOver = (event) => {
    const { jump, max, min, fixed } = values;
    const minValue = minValueRef.current || (fixed ? fixed[0] : min);
    const maxValue =
      maxValueRef.current || (fixed ? fixed[fixed.length - 1] : max);
    const markValue = Number(event.target.id.replace("slider-mark-", ""));

    if (!event.target.id) {
      return;
    }
    event.preventDefault();

    if (fixed) {
      const minFixedValue = fixed[0];
      const maxFixedValue = fixed[fixed.length - 1];

      if (selectorBeingDragged.current === MIN) {
        if (markValue < minFixedValue) {
          changeCurrentMinValue(minFixedValue);
        } else if (markValue >= maxValue) {
          changeCurrentMinValue(getPreviousValue(maxValue, fixed));
        } else {
          changeCurrentMinValue(markValue);
        }
      } else if (selectorBeingDragged.current === MAX) {
        if (markValue > maxFixedValue) {
          changeCurrentMaxValue(maxFixedValue);
        } else if (markValue <= minValue) {
          changeCurrentMaxValue(getNextValue(minValue, fixed));
        } else {
          changeCurrentMaxValue(markValue);
        }
      }
    } else {
      if (selectorBeingDragged.current === MIN) {
        if (markValue < min) {
          changeCurrentMinValue(min);
        } else if (markValue >= maxValue) {
          changeCurrentMinValue(maxValue - jump);
        } else {
          changeCurrentMinValue(markValue);
        }
      } else if (selectorBeingDragged.current === MAX) {
        if (markValue > max) {
          changeCurrentMaxValue(max);
        } else if (markValue <= minValue) {
          changeCurrentMaxValue(minValue + jump);
        } else {
          changeCurrentMaxValue(markValue);
        }
      }
    }
  };

  const onFinishDragging = (event) => {
    const selectorType = event.dataTransfer.getData("text");
    const { min, jump, fixed } = values;
    let markId = Number(event.target.id.replace("slider-mark-", ""));

    event.preventDefault();

    if (!event.target.id) {
      return;
    }

    if (fixed) {
      const minFixedValue = fixed[0];

      if (markId === 0 && minFixedValue > 0) {
        markId = minFixedValue;
      }
      if (type === SINGLE && !selectorType && markId !== valueRef.current) {
        valueRef.current = markId;
        onChange(markId);
      }
      if (selectorType === MIN && markId !== minValueRef.current) {
        if (markId >= maxValueRef.current) {
          const maxAllowed = getPreviousValue(maxValueRef.current, fixed);
          minValueRef.current = maxAllowed;
          changeCurrentMinValue(maxAllowed);
        } else {
          minValueRef.current = markId;
          changeCurrentMinValue(markId);
        }
      }
      if (selectorType === MAX && markId !== maxValueRef.current) {
        if (markId <= minValueRef.current) {
          const minAllowed = getNextValue(minValueRef.current, fixed);
          maxValueRef.current = minAllowed;
          changeCurrentMaxValue(minAllowed);
        } else {
          maxValueRef.current = markId;
          changeCurrentMaxValue(markId);
        }
      }
    } else {
      if (markId === 0 && min > 0) {
        markId = min;
      }

      if (type === SINGLE && !selectorType && markId !== valueRef.current) {
        valueRef.current = markId;
        onChange(markId);
      }

      if (selectorType === MIN && markId !== minValueRef.current) {
        if (markId >= maxValueRef.current) {
          const maxAllowed = maxValueRef.current - jump;
          minValueRef.current = maxAllowed;
          changeCurrentMinValue(maxAllowed);
        } else {
          minValueRef.current = markId;
          changeCurrentMinValue(markId);
        }
      }

      if (selectorType === MAX && markId !== maxValueRef.current) {
        if (markId <= minValueRef.current) {
          const minAllowed = minValueRef.current + jump;
          maxValueRef.current = minAllowed;
          changeCurrentMaxValue(minAllowed);
        } else {
          maxValueRef.current = markId;
          changeCurrentMaxValue(markId);
        }
      }
    }
    selectorBeingDragged.current = null;
  };

  useEffect(() => {
    const { min, max, jump, fixed } = values;

    if (values.fixed) {
      const minValue = fixed[0];
      const maxValue = fixed[fixed.length - 1];

      updateSelectionMarks(fixed);
      changeCurrentMinValue(minValue);
      minValueRef.current = minValue;
      changeCurrentMaxValue(maxValue);
      maxValueRef.current = maxValue;

      if (type === SINGLE) {
        onChange(fixed[0]);
      }
    } else if (min && max && jump) {
      const updatedMarks = [];

      for (let i = min; i < max; i = i + jump) {
        if (i !== min && i % jump !== 0) {
          i = i - (i % jump);
        }
        updatedMarks.push(i);
      }
      updatedMarks.push(max);
      updateSelectionMarks(updatedMarks);
      changeCurrentMaxValue(max);
      changeCurrentMinValue(min);
      if (type === SINGLE) {
        onChange(min);
      }
    }

    if (!listenersOn.current) {
      addListeners();
    } else {
      removeListeners();
      addListeners();
    }
  }, [values]);

  useEffect(() => {
    return () => {
      removeListeners();
    };
  }, []);

  return (
    <RangeArea>
      {editMin ? (
        <MarkInput
          autoFocus
          data-test-id="range__input--min"
          defaultValue={editMin}
          list={selectionMarks}
          max={maxValueRef.current}
          min={0}
          onBlur={() => onConfirmInputChange(MIN)}
          onChange={(event) => onChangeInput(MIN, event.target.value)}
          step={values.jump}
          type="number"
        />
      ) : (
        <MarkLabel
          data-test-id="range__label--min"
          onClick={() =>
            values.fixed || type === SINGLE
              ? null
              : updateEditMin(minValueRef.current)
          }
          type={MIN}
        >
          {type === RANGE && currentMinValue
            ? `${currentMinValue}${unit || ""}`
            : `${values.min}${unit || ""}`}
        </MarkLabel>
      )}
      <Slider>
        {selectionMarks.map((mark) => (
          <Mark
            currentMax={type === RANGE && mark === currentMaxValue}
            currentMin={type === RANGE && mark === currentMinValue}
            currentSelection={type === SINGLE && mark === currentValue}
            data-selectortype={getSelectorType(mark)}
            data-test-id={`range__mark--${mark}`}
            displayMarks={displayMarks}
            draggable="true"
            id={`slider-mark-${mark}`}
            inRange={
              type === RANGE &&
              mark >= currentMinValue &&
              mark <= currentMaxValue
            }
            key={`mark-${mark}`}
            onClick={(event) =>
              type === "SINGLE" ? onClickSlider(event.currentTarget.id) : null
            }
            selector={mark === currentMaxValue ? MAX : MIN}
            type={type}
            value={mark}
          >
            <span>.</span>
          </Mark>
        ))}
      </Slider>
      {editMax ? (
        <MarkInput
          autoFocus
          data-test-id="range__input--max"
          defaultValue={editMax}
          max={values.max}
          min={minValueRef.current + values.jump}
          onChange={(event) => onChangeInput(MAX, event.target.value)}
          onBlur={() => onConfirmInputChange(MAX)}
          step={values.jump}
          type="number"
        />
      ) : (
        <MarkLabel
          data-test-id="range__label--max"
          onClick={() =>
            values.fixed || type === SINGLE
              ? null
              : updateEditMax(maxValueRef.current)
          }
          type={MAX}
        >
          {type === RANGE && currentMaxValue
            ? `${currentMaxValue}${unit || ""}`
            : `${values.max}${unit || ""}`}
        </MarkLabel>
      )}
    </RangeArea>
  );
};

Range.propTypes = {
  changeCurrentMaxValue: func.isRequired,
  changeCurrentMinValue: func.isRequired,
  currentMaxValue: number,
  currentMinValue: number,
  currentValue: number,
  displayMarks: bool,
  onChange: func.isRequired,
  type: oneOf([RANGE, SINGLE]),
  unit: string,
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
  displayMarks: true,
  type: SINGLE,
  unit: null,
  values: { min: 1, max: 100, jump: 10 },
};

export default Range;
