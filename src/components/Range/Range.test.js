import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { RANGE, SINGLE } from "constants";
import Range from "./Range";

configure({ adapter: new Adapter() });

const MOCK_DATA = {
  min: 50,
  max: 300,
  jump: 50,
};

const MOCK_DATA_FIXED = {
  fixed: [18, 19, 20, 21],
};

const MOCK_UNIT = "x$";

describe("[Range] component with normal values", () => {
  const mockChangeCurrentMaxValue = jest.fn();
  const mockChangeCurrentMinValue = jest.fn();
  const mockOnChange = jest.fn();

  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Range
        changeCurrentMaxValue={mockChangeCurrentMaxValue}
        changeCurrentMinValue={mockChangeCurrentMinValue}
        currentMaxValue={MOCK_DATA.max}
        currentMinValue={MOCK_DATA.min}
        currentValue={undefined}
        displayMarks={true}
        onChange={mockOnChange}
        type={RANGE}
        unit={MOCK_UNIT}
        values={MOCK_DATA}
      />
    );
  });

  it("should match the snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should display a min and max labels displaying the values received by props", () => {
    const minLabel = wrapper.find('[data-test-id="range__label--min"]');
    const maxLabel = wrapper.find('[data-test-id="range__label--max"]');
    expect(minLabel.first().text()).toBe(`${MOCK_DATA.min}${MOCK_UNIT}`);
    expect(maxLabel.first().text()).toBe(`${MOCK_DATA.max}${MOCK_UNIT}`);
  });

  it("should display a min and max labels with default values of 1 and 100 if no value is received by props", () => {
    const wrapperWithDefaultValues = mount(
      <Range
        changeCurrentMaxValue={mockChangeCurrentMaxValue}
        changeCurrentMinValue={mockChangeCurrentMinValue}
        currentMaxValue={undefined}
        currentMinValue={undefined}
        currentValue={undefined}
        displayMarks={true}
        onChange={mockOnChange}
        type={RANGE}
        unit={MOCK_UNIT}
        values={undefined}
      />
    );
    const minLabel = wrapperWithDefaultValues.find(
      '[data-test-id="range__label--min"]'
    );
    const maxLabel = wrapperWithDefaultValues.find(
      '[data-test-id="range__label--max"]'
    );
    expect(minLabel.first().text()).toBe(`${1}${MOCK_UNIT}`);
    expect(maxLabel.first().text()).toBe(`${100}${MOCK_UNIT}`);
  });

  it("should trigger a changeCurrentMinValue and changeCurrentMaxValue received by props upon mounting, sending the initial min and max values", () => {
    expect(mockChangeCurrentMinValue).toHaveBeenCalledWith(MOCK_DATA.min);
    expect(mockChangeCurrentMaxValue).toHaveBeenCalledWith(MOCK_DATA.max);
  });

  it("should change min label to input when clicked upon. It the value is changed, a changeCurrentMinValue function is called with the new value", () => {
    const NEW_MIN_VALUE = 100;
    let minLabel = wrapper.find('[data-test-id="range__label--min"]');
    let minInput = wrapper.find('[data-test-id="range__input--min"]');

    expect(minLabel.exists()).toBe(true);
    expect(minInput.exists()).toBe(false);

    minLabel.first().simulate("click");

    minLabel = wrapper.find('[data-test-id="range__label--min"]');
    minInput = wrapper.find('[data-test-id="range__input--min"]');
    expect(minLabel.exists()).toBe(false);
    expect(minInput.exists()).toBe(true);

    minInput.first().simulate("change", { target: { value: NEW_MIN_VALUE } });
    minInput.first().simulate("blur");
    expect(mockChangeCurrentMinValue).toHaveBeenCalledWith(NEW_MIN_VALUE);
  });

  it("should change max label to input when clicked upon. It the value is changed, a changeCurrentMaxValue function is called with the new value", () => {
    const NEW_MAX_VALUE = 200;
    let maxLabel = wrapper.find('[data-test-id="range__label--max"]');
    let maxInput = wrapper.find('[data-test-id="range__input--max"]');

    expect(maxLabel.exists()).toBe(true);
    expect(maxInput.exists()).toBe(false);

    maxLabel.first().simulate("click");

    maxLabel = wrapper.find('[data-test-id="range__label--max"]');
    maxInput = wrapper.find('[data-test-id="range__input--max"]');
    expect(maxLabel.exists()).toBe(false);
    expect(maxInput.exists()).toBe(true);

    maxInput.first().simulate("change", { target: { value: NEW_MAX_VALUE } });
    maxInput.first().simulate("blur");
    expect(mockChangeCurrentMaxValue).toHaveBeenCalledWith(NEW_MAX_VALUE);
  });
});

describe("[Range] component with a single selector", () => {
  const mockChangeCurrentMaxValue = jest.fn();
  const mockChangeCurrentMinValue = jest.fn();
  const mockOnChange = jest.fn();

  let wrapperSingle;

  beforeAll(() => {
    wrapperSingle = mount(
      <Range
        changeCurrentMaxValue={mockChangeCurrentMaxValue}
        changeCurrentMinValue={mockChangeCurrentMinValue}
        currentMaxValue={MOCK_DATA.max}
        currentMinValue={MOCK_DATA.min}
        currentValue={undefined}
        displayMarks={true}
        onChange={mockOnChange}
        type={SINGLE}
        unit={MOCK_UNIT}
        values={MOCK_DATA}
      />
    );
  });

  it("should match the snapshot", () => {
    expect(toJson(wrapperSingle)).toMatchSnapshot();
  });

  it("should change the current value when a new value is clicked upon ", () => {
    const maxMark = wrapperSingle.find(
      `[data-test-id="range__mark--${MOCK_DATA.max}"]`
    );

    maxMark.first().simulate("click");
    expect(mockOnChange).toHaveBeenCalledWith(MOCK_DATA.max);
  });
});

describe("[Range] component with fixed values", () => {
  const mockChangeCurrentMaxValue = jest.fn();
  const mockChangeCurrentMinValue = jest.fn();
  const mockOnChange = jest.fn();

  let wrapperFixed;

  beforeAll(() => {
    wrapperFixed = mount(
      <Range
        changeCurrentMaxValue={mockChangeCurrentMaxValue}
        changeCurrentMinValue={mockChangeCurrentMinValue}
        currentMaxValue={undefined}
        currentMinValue={undefined}
        currentValue={undefined}
        displayMarks={true}
        onChange={mockOnChange}
        type={RANGE}
        unit={MOCK_UNIT}
        values={MOCK_DATA_FIXED}
      />
    );
  });

  it("should match the snapshot", () => {
    expect(toJson(wrapperFixed)).toMatchSnapshot();
  });
});
