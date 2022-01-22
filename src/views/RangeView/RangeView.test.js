import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { RANGE } from "../../constants";
import RangeView from "./RangeView";
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

const MOCK_DATA = {
  min: 50,
  max: 300,
  jump: 50,
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: false }),
  })
);

const MOCK_UNIT = "x$";

describe("[RangeView] component", () => {
  const mockChangeCurrentMaxValue = jest.fn();
  const mockChangeCurrentMinValue = jest.fn();
  const mockOnChange = jest.fn();
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <BrowserRouter>
        <RangeView
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
      </BrowserRouter>
    );
  });

  it("should match the snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
