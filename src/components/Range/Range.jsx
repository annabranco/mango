import React, { useEffect } from "react";
import { bool, func, number, oneOf, shape, string } from "prop-types";

import { useRefWithLabel, useStateWithLabel } from "../../utils/hooks";
import { BLANK_IMG, MAX, MIN, RANGE, SINGLE } from "../../constants";

import { Mark, MarkInput, MarkLabel, RangeArea, Slider } from "./Range.styles";

const Range = ({
  changeCurrentMaxValue,
  changeCurrentMinValue,
  currentMaxValue,
  currentMinValue,
  currentValue,
  hideMarks,
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

  const waitForDebounce = useRefWithLabel(null, "debounceInterval");
  const listenersOn = useRefWithLabel(null, "listenersOn");
  const maxValueRef = useRefWithLabel(values.max, "maxValueRef");
  const minValueRef = useRefWithLabel(values.min, "minValueRef");
  const selectorBeingDragged = useRefWithLabel(null, "selectorBeingDragged");
  const valueRef = useRefWithLabel(null, "valueRef");

  const useDebounceInterval = (callback) => {
    if (!waitForDebounce.current) {
      callback();
      waitForDebounce.current = true;
      setTimeout(() => {
        waitForDebounce.current = false;
      }, 20);
    }
  };

  //-- Logics for SINGLE value
  const onClickSlider = (event) => {
    const { id: markId } = event?.target || {};
    onChange(Number(markId.replace("slider-mark-", "")));
  };

  const onMoveSlider = (event) => {
    event.preventDefault();

    useDebounceInterval(() => {
      const markId = event?.target?.id.replace("slider-mark-", "");
      event.dataTransfer.effectAllowed = "none";

      if (type === SINGLE && markId !== valueRef.current) {
        valueRef.current = markId;
        onChange(Number(markId));
      }
    });
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

  const onChangeInput = (inputType) => (event) => {
    const { value } = event?.target || {};
    if (inputType === MIN) {
      updateEditMin(Number(value));
    } else if (inputType === MAX) {
      updateEditMax(Number(value));
    }
  };

  const roundValue = (valueToCheck, inputType) => {
    const { jump, min } = values;
    const minValue = minValueRef.current;
    const maxValue = maxValueRef.current;

    if (valueToCheck >= maxValue) {
      if (inputType === MIN) {
        return maxValue - jump;
      }
      return valueToCheck;
    }
    if (valueToCheck <= minValue) {
      if (inputType === MAX) {
        return minValue + jump;
      }
      return valueToCheck;
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

  const onConfirmInputChange = (inputType) => () => {
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
    useDebounceInterval(() => {
      const { jump, max, min, fixed: fixedValues } = values;
      const minValue =
        minValueRef.current || (fixedValues ? fixedValues[0] : min);
      const maxValue =
        maxValueRef.current ||
        (fixedValues ? fixedValues[fixedValues.length - 1] : max);
      const markValue = Number(event.target.id.replace("slider-mark-", ""));

      if (!event.target.id) {
        return;
      }
      event.preventDefault();

      if (fixedValues) {
        const minFixedValue = fixedValues[0];
        const maxFixedValue = fixedValues[fixedValues.length - 1];

        if (selectorBeingDragged.current === MIN) {
          if (markValue < minFixedValue) {
            changeCurrentMinValue(minFixedValue);
          } else if (markValue >= maxValue) {
            changeCurrentMinValue(getPreviousValue(maxValue, fixedValues));
          } else {
            changeCurrentMinValue(markValue);
          }
        } else if (selectorBeingDragged.current === MAX) {
          if (markValue > maxFixedValue) {
            changeCurrentMaxValue(maxFixedValue);
          } else if (markValue <= minValue) {
            changeCurrentMaxValue(getNextValue(minValue, fixedValues));
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
    });
  };

  const onFinishDragging = (event) => {
    const selectorType = event.dataTransfer.getData("text");
    const { min, jump, fixed: fixedValues } = values;
    let markId = Number(event.target.id.replace("slider-mark-", ""));

    event.preventDefault();

    if (!event.target.id) {
      return;
    }

    if (fixedValues) {
      const minFixedValue = fixedValues[0];

      if (markId === 0 && minFixedValue > 0) {
        markId = minFixedValue;
      }
      if (type === SINGLE && !selectorType && markId !== valueRef.current) {
        valueRef.current = markId;
        onChange(markId);
      }
      if (selectorType === MIN && markId !== minValueRef.current) {
        if (markId >= maxValueRef.current) {
          const maxAllowed = getPreviousValue(maxValueRef.current, fixedValues);
          minValueRef.current = maxAllowed;
          changeCurrentMinValue(maxAllowed);
        } else {
          minValueRef.current = markId;
          changeCurrentMinValue(markId);
        }
      }
      if (selectorType === MAX && markId !== maxValueRef.current) {
        if (markId <= minValueRef.current) {
          const minAllowed = getNextValue(minValueRef.current, fixedValues);
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
    const { min, max, jump, fixed: fixedValues } = values;

    if (fixedValues) {
      const minValue = fixedValues[0];
      const maxValue = fixedValues[fixedValues.length - 1];

      updateSelectionMarks(fixedValues);
      changeCurrentMinValue(minValue);
      minValueRef.current = minValue;
      changeCurrentMaxValue(maxValue);
      maxValueRef.current = maxValue;

      if (type === SINGLE) {
        onChange(fixedValues[0]);
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
      maxValueRef.current = max;
      changeCurrentMinValue(min);
      minValueRef.current = min;

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

    return () => {
      removeListeners();
    };
  }, [values]);

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
          onBlur={onConfirmInputChange(MIN)}
          onChange={onChangeInput(MIN)}
          step={values.jump}
          type="number"
        />
      ) : (
        <MarkLabel
          clickable={!values.fixed && type !== SINGLE}
          data-test-id="range__label--min"
          onClick={
            values.fixed || type === SINGLE
              ? null
              : () => updateEditMin(minValueRef.current)
          }
          type={MIN}
        >
          {type === RANGE && (currentMinValue || currentMinValue === 0)
            ? `${currentMinValue}${unit || ""}`
            : `${values.min}${unit || ""}`}
        </MarkLabel>
      )}
      <Slider>
        {selectionMarks.map((mark) => (
          <Mark
            data-selectortype={getSelectorType(mark)}
            data-test-id={`range__mark--${mark}`}
            hideMarks={hideMarks}
            draggable="true"
            id={`slider-mark-${mark}`}
            key={`mark-${mark}`}
            selector={mark === currentMaxValue ? MAX : MIN}
            type={type}
            value={mark}
            {...(() =>
              type === SINGLE && {
                currentSelection: mark === currentValue,
                onClick: onClickSlider,
              })()}
            {...(() =>
              type === RANGE && {
                currentMax: mark === currentMaxValue,
                currentMin: mark === currentMinValue,
                inRange: mark >= currentMinValue && mark <= currentMaxValue,
              })()}
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
          onChange={onChangeInput(MAX)}
          onBlur={onConfirmInputChange(MAX)}
          step={values.jump}
          type="number"
        />
      ) : (
        <MarkLabel
          clickable={!values.fixed && type !== SINGLE}
          data-test-id="range__label--max"
          onClick={
            values.fixed || type === SINGLE
              ? null
              : () => updateEditMax(maxValueRef.current)
          }
          type={MAX}
        >
          {type === RANGE && (currentMaxValue || currentMaxValue === 0)
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
  currentMaxValue: number.isRequired,
  currentMinValue: number.isRequired,
  currentValue: number.isRequired,
  hideMarks: bool.isRequired,
  onChange: func.isRequired,
  type: oneOf([RANGE, SINGLE]).isRequired,
  unit: string,
  values: shape({
    min: number,
    max: number,
    jump: number,
  }),
};

Range.defaultProps = {
  unit: null,
  values: {},
};

export default Range;
