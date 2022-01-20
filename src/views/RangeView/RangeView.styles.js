import { Link } from "react-router-dom";
import styled from "styled-components";

export const BackLink = styled(Link)`
  margin: 100px 0 0;
  width: auto;
  padding: 10px 30px;
  border-radius: 20px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
  border: 1px solid black;
  background: limegreen;
  font-size: 0.9rem;
  font-weight: 700;
  text-align: left;
  color: black;
  text-transform: uppercase;

  &:hover {
    filter: saturate(2) brightness(2);
    box-shadow: -1px -1px 1px 1px rgba(0, 0, 0, 0.5);
    transform: translate(2px, 2px);
  }
`;
BackLink.displayName = "BackLink";

export const SelectionText = styled.p`
  margin: 20px auto 40px;
  margin-left: 15vw;
  width: 100%;
  font-size: 1.4rem;
  text-align: left;
`;
SelectionText.displayName = "SelectionText";
