import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";

import App from "./App";

configure({ adapter: new Adapter() });

describe("[App] component with normal values", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it("should match the snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
