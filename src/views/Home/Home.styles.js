import styled from "styled-components";
import { Link } from "react-router-dom";

export const HomeLink = styled(Link)`
  margin: 20px auto;
  font-size: 2rem;
  font-weight: 900;
  color: green;
  -webkit-text-stroke: 1px black;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease;

  &:hover {
    filter: saturate(2) brightness(2);
  }
`;
HomeLink.displayName = "HomeLink";

export const HomeText = styled.p`
  margin-bottom: 50px;
  font-size: 1.15rem;
  font-weight: 400;
  font-style: italic;
`;
HomeText.displayName = "HomeText";

export const HomeWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;
HomeWrapper.displayName = "HomeWrapper";
