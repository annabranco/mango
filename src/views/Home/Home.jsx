import React from "react";
import { HomeLink, HomeText, HomeWrapper } from "./Home.styles";

const Home = () => {
  return (
    <HomeWrapper>
      <HomeText>Please select exercise:</HomeText>
      <HomeLink to="exercise1">Exercise 1</HomeLink>
      <HomeLink to="exercise2">Exercise 2</HomeLink>
    </HomeWrapper>
  );
};

export default Home;
