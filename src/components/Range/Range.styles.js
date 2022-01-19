import styled, { css } from "styled-components";
import DraggableLeft from "assets/images/draggable-left.jpg";
import DraggableRight from "assets/images/draggable-right.jpg";

export const RangeArea = styled.div`
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
  height: 50px;
  width: 80%;
  padding: 0;
  background: lightgray;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
`;
Slider.displayName = "Slider";

const markValue = css`
  content: "${({ value }) => value}";
`;

export const Mark = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  color: lightgray;
  cursor: grab;
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
      border-radius: 0 20px 20px 0;
      height: 100%;
      aspect-ratio: 1/1;
      border: 1px solid black;
      color: green;

      &:after {
        ${markValue};
        font-size: 1.5rem;
        position: absolute;
        bottom: -40px;
      }
    `}

  ${({ currentMin }) =>
    currentMin &&
    css`
      border-radius: 20px 0 0 20px;
      background-image: ${`linear-gradient(rgba(0,128,0, 0.7),rgba(0,128,0, 0.7)), url(${DraggableLeft})`};
    `}

  &:active {
    cursor: grabbing;
  }
`;
Mark.displayName = "Mark";

export const MarkLabel = styled.label`
  margin: 0 10px;
  font-size: 0.9rem;
`;
MarkLabel.displayName = "MarkLabel";
