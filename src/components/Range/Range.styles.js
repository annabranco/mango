import styled, { css } from "styled-components";
import DraggableLeft from "assets/images/draggable-left.jpg";
import DraggableRight from "assets/images/draggable-right.jpg";
import { MAX, SINGLE } from "../../constants";

export const RangeArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
`;
RangeArea.displayName = "RangeArea";

export const Slider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  height: 10px;
  width: 80%;
  padding: 0;
  background: lightgray;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
`;
Slider.displayName = "Slider";

const markValue = css`
  content: "${({ displayMarks, value }) => (displayMarks ? value : null)}";
`;

export const Mark = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 10px;
  width: 100%;
  color: lightgray;
  cursor: ${({ type }) => (type === SINGLE ? "grab" : "inherit")};
  user-select: none;

  &:after {
    ${markValue};
    position: absolute;
    bottom: 4px;
    color: gray;
    font-size: 0.7rem;
  }

  ${({ currentSelection, value }) =>
    currentSelection &&
    css`
      position: relative;
      background: red;
      border-radius: 5px;
      height: 100%;
      aspect-ratio: 1/1;
      border: 1px solid black;
      box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
      color: red;

      &:after {
        ${markValue};
        position: absolute;
        bottom: -25px;
      }
    `}

  ${({ inRange }) =>
    inRange &&
    css`
      position: relative;
      background: green;
      height: 100%;
      color: green;

      &:after {
        ${markValue};
        position: absolute;
        bottom: -25px;
      }
    `}

  ${({ currentMax, currentMin }) =>
    (currentMax || currentMin) &&
    css`
      z-index: 10;
      position: relative;
      background-image: ${`linear-gradient(rgba(0,128,0, 0.7),rgba(0,128,0, 0.7)), url(${DraggableRight})`};
      background-size: cover;
      border-radius: 50%;
      height: 15px;
      width: 25px;
      aspect-ratio: 1/1;
      border: 1px solid black;
      color: green;
      cursor: grab;
      zoom: 2;

      &:after {
        ${markValue};
        font-size: 1.5rem;
        position: absolute;
        bottom: -40px;
      }
    `}

  &:active {
    cursor: ${({ type }) => (type === SINGLE ? "grabbing" : "inherit")};
  }

  & > span {
    visibility: hidden;
  }
`;
Mark.displayName = "Mark";

export const MarkLabel = styled.label`
  margin: 0 10px;
  font-size: 1.2rem;
  width: 60px;
  text-align: right;

  ${({ type }) =>
    type === MAX &&
    css`
      text-align: left;
    `}
`;
MarkLabel.displayName = "MarkLabel";

export const MarkInput = styled.input`
  position: relative;
  margin: 0 10px;
  font-size: 1.2rem;
  border: 0;
  width: 60px;
`;
MarkInput.displayName = "MarkInput";
