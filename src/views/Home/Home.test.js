import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";

import Home from "./Home";

configure({ adapter: new Adapter() });

describe("[Home] component with normal values", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Home />);
  });

  it("should match the snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
