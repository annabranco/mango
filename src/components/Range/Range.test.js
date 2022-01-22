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

  beforeEach(() => {
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
        unit={undefined}
        values={undefined}
      />
    );
    const minLabel = wrapperWithDefaultValues.find(
      '[data-test-id="range__label--min"]'
    );
    const maxLabel = wrapperWithDefaultValues.find(
      '[data-test-id="range__label--max"]'
    );
    expect(minLabel.first().text()).toBe("1");
    expect(maxLabel.first().text()).toBe("100");
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

  it("should change min label to the min accepted value if users tries to set it to a value lower than the min specified", () => {
    const VALUE_LOWER_THAN_MIN = MOCK_DATA.min - 10;
    const minLabel = wrapper.find('[data-test-id="range__label--min"]');

    mockChangeCurrentMinValue.mockClear();
    minLabel.first().simulate("click");

    const minInput = wrapper.find('[data-test-id="range__input--min"]');

    minInput
      .first()
      .simulate("change", { target: { value: VALUE_LOWER_THAN_MIN } });
    minInput.first().simulate("blur");
    expect(mockChangeCurrentMinValue).toHaveBeenCalledWith(MOCK_DATA.min);
  });

  it("should change min label to the max accepted value (max - jump) if users tries to set it to a value higher than the current max slider value", () => {
    const VALUE_HIGHER_THAN_MAX = MOCK_DATA.max + 10;
    const minLabel = wrapper.find('[data-test-id="range__label--min"]');

    mockChangeCurrentMinValue.mockClear();
    minLabel.first().simulate("click");

    const minInput = wrapper.find('[data-test-id="range__input--min"]');

    minInput
      .first()
      .simulate("change", { target: { value: VALUE_HIGHER_THAN_MAX } });
    minInput.first().simulate("blur");

    expect(mockChangeCurrentMinValue).toHaveBeenCalledWith(
      MOCK_DATA.max - MOCK_DATA.jump
    );
  });

  it("should change max label to the max accepted value if users tries to set it to a value higher than the max specified", () => {
    const VALUE_HIGHER_THAN_MAX = MOCK_DATA.max + 10;
    const maxLabel = wrapper.find('[data-test-id="range__label--max"]');

    mockChangeCurrentMaxValue.mockClear();
    maxLabel.first().simulate("click");

    const maxInput = wrapper.find('[data-test-id="range__input--max"]');

    maxInput
      .first()
      .simulate("change", { target: { value: VALUE_HIGHER_THAN_MAX } });
    maxInput.first().simulate("blur");
    expect(mockChangeCurrentMaxValue).toHaveBeenCalledWith(MOCK_DATA.max);
  });

  it("should change max label to the min accepted value (min + jump) if users tries to set it to a value lower than the current min slider value", () => {
    const VALUE_LOWER_THAN_MIN = MOCK_DATA.min - 10;
    const maxLabel = wrapper.find('[data-test-id="range__label--max"]');

    mockChangeCurrentMaxValue.mockClear();
    maxLabel.first().simulate("click");

    const maxInput = wrapper.find('[data-test-id="range__input--max"]');

    maxInput
      .first()
      .simulate("change", { target: { value: VALUE_LOWER_THAN_MIN } });
    maxInput.first().simulate("blur");

    expect(mockChangeCurrentMaxValue).toHaveBeenCalledWith(
      MOCK_DATA.min + MOCK_DATA.jump
    );
  });

  it("should round down the value to the previous accepted value if the user defines a value that does not follow the jump intervals between numbers", () => {
    const VALUE_NOT_ACCEPTED = MOCK_DATA.max - MOCK_DATA.jump + 20;
    const maxLabel = wrapper.find('[data-test-id="range__label--max"]');

    mockChangeCurrentMaxValue.mockClear();
    maxLabel.first().simulate("click");

    const maxInput = wrapper.find('[data-test-id="range__input--max"]');

    maxInput
      .first()
      .simulate("change", { target: { value: VALUE_NOT_ACCEPTED } });
    maxInput.first().simulate("blur");

    expect(mockChangeCurrentMaxValue).toHaveBeenCalledWith(
      MOCK_DATA.max - MOCK_DATA.jump
    );
  });

  it("should set the label value to the min if the user defines a value that does not follow the jump intervals between numbers and when rounded down stays below the minimum", () => {
    const VALUE_NOT_ACCEPTED = MOCK_DATA.min + MOCK_DATA.jump - 10;
    const minLabel = wrapper.find('[data-test-id="range__label--min"]');

    mockChangeCurrentMinValue.mockClear();
    minLabel.first().simulate("click");

    const minInput = wrapper.find('[data-test-id="range__input--min"]');

    minInput
      .first()
      .simulate("change", { target: { value: VALUE_NOT_ACCEPTED } });
    minInput.first().simulate("blur");

    expect(mockChangeCurrentMinValue).toHaveBeenCalledWith(MOCK_DATA.min);
  });

  it("should correctly update the min and max labels if the props values change dynamically", () => {
    const NEW_MOCK_DATA = {
      min: 100,
      max: 500,
      jump: 100,
    };

    let minLabel = wrapper.find('[data-test-id="range__label--min"]');
    let maxLabel = wrapper.find('[data-test-id="range__label--max"]');

    expect(minLabel.first().text()).toBe(`${MOCK_DATA.min}${MOCK_UNIT}`);
    expect(maxLabel.first().text()).toBe(`${MOCK_DATA.max}${MOCK_UNIT}`);

    wrapper.setProps({ values: NEW_MOCK_DATA });
    wrapper.update();

    minLabel = wrapper.find('[data-test-id="range__label--min"]');
    maxLabel = wrapper.find('[data-test-id="range__label--max"]');

    expect(minLabel.first().text()).toBe(`${NEW_MOCK_DATA.min}${MOCK_UNIT}`);
    expect(maxLabel.first().text()).toBe(`${NEW_MOCK_DATA.max}${MOCK_UNIT}`);
  });

  xit("should change the min value label when the min selector is dragged on the slider", async () => {
    // TOFIX [22-Jan-22]: Fix tests related to drag event (Anna Branco)
    // const startNode = wrapper.querySelector(`[data-test-id="range__mark--${MOCK_DATA.min}"]`);

    const createBubbledEvent = (type, props = {}) => {
      const event = new Event(type, { bubbles: true });
      Object.assign(event, props);
      return event;
    };
    const minSelector = wrapper.find(
      `[data-test-id="range__mark--${MOCK_DATA.min}"]`
    );
    const newMarkAfterDragging = wrapper.find(
      `[data-test-id="range__mark--${MOCK_DATA.min + MOCK_DATA.jump}"]`
    );
    let minLabel = wrapper.find('[data-test-id="range__label--min"]');

    expect(minLabel.first().text()).toBe(`${MOCK_DATA.min}${MOCK_UNIT}`);

    // minSelector.dispatchEvent(
    //   createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
    // );
    // newMarkAfterDragging.dispatchEvent(
    //   createBubbledEvent("drop", { clientX: 0, clientY: 1 })
    // );

    // minSelector
    //   .first()
    //   .simulate("mousedown")
    //   .simulate("mousemove", { pageY: 100 })
    //   .simulate("mouseup");

    // await minSelector.first().simulate(
    //   "mousedown",
    //   {
    //     nativeEvent: {
    //       offsetX: 200,
    //       offsetY: 0,
    //     },
    //   },
    //   9000
    // );

    minSelector.first().simulate("mouseDown");
    // minSelector.first().simulate("dragstart");
    // newMarkAfterDragging.first().simulate("mouseup");
    const top = window.document;
    minSelector.first().simulate("mousedown");
    const mouseMove = new Event("mousemove", {
      view: window,
      bubbles: true,
      clientX: 500,
      clientY: 0,
    }); // creates a new event
    top.dispatchEvent(mouseMove); // dispatches it
    const mouseUp = new Event("mouseup");
    top.dispatchEvent(mouseUp);

    minLabel = wrapper.find('[data-test-id="range__label--min"]');
    expect(minLabel.first().text()).toBe(`${MOCK_DATA.min}${MOCK_UNIT}3`);
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

  it("should change the current value correctly when a fixed value is clicked upon ", () => {
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
        unit={undefined}
        values={MOCK_DATA_FIXED}
      />
    );
    const fixedMark = wrapperSingle.find(
      `[data-test-id="range__mark--${MOCK_DATA_FIXED.fixed[2]}"]`
    );

    fixedMark.first().simulate("click");
    expect(mockOnChange).toHaveBeenCalledWith(MOCK_DATA_FIXED.fixed[2]);
  });
});

describe("[Range] component with fixed values", () => {
  const mockChangeCurrentMaxValue = jest.fn();
  const mockChangeCurrentMinValue = jest.fn();
  const mockOnChange = jest.fn();

  let wrapperFixed;

  beforeEach(() => {
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
        unit={undefined}
        values={MOCK_DATA_FIXED}
      />
    );
  });

  it("should match the snapshot", () => {
    expect(toJson(wrapperFixed)).toMatchSnapshot();
  });

  it("should not change min label to input when clicked upon.", () => {
    let minLabel = wrapperFixed.find('[data-test-id="range__label--min"]');
    let minInput = wrapperFixed.find('[data-test-id="range__input--min"]');

    expect(minLabel.exists()).toBe(true);
    expect(minInput.exists()).toBe(false);

    minLabel.first().simulate("click");

    minLabel = wrapperFixed.find('[data-test-id="range__label--min"]');
    minInput = wrapperFixed.find('[data-test-id="range__input--min"]');
    expect(minLabel.exists()).toBe(true);
    expect(minInput.exists()).toBe(false);
  });

  it("should not change max label to input when clicked upon.", () => {
    let maxLabel = wrapperFixed.find('[data-test-id="range__label--max"]');
    let maxInput = wrapperFixed.find('[data-test-id="range__input--max"]');

    expect(maxLabel.exists()).toBe(true);
    expect(maxInput.exists()).toBe(false);

    maxLabel.first().simulate("click");

    maxLabel = wrapperFixed.find('[data-test-id="range__label--max"]');
    maxInput = wrapperFixed.find('[data-test-id="range__input--max"]');
    expect(maxLabel.exists()).toBe(true);
    expect(maxInput.exists()).toBe(false);
  });
});
