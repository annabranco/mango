import styled, { css } from "styled-components";
import { MAX, SINGLE } from "../../constants";

const markValue = css`
  content: "${({ hideMarks, value }) => (hideMarks ? null : value)}";
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
    bottom: -25px;
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

  ${({ currentMax, currentMin, selector }) =>
    (currentMax || currentMin) &&
    css`
      z-index: 10;
      position: relative;
      width: 100%;
      aspect-ratio: 1/1;
      color: green;
      cursor: grab;
      background-image: linear-gradient(
        ${currentMin ? "to right" : "to left"},
        lightgray,
        lightgray,
        lightgray,
        lightgray,
        green,
        green,
        green,
        green
      );

      &:before {
        content: "";
        position: absolute;
        top: -6px;
        font-size: 0.5rem;
        height: 20px;
        width: 20px;
        background: darkgreen;
        border-radius: 50%;
        border: 1px solid black;
        position: absolute;
        bottom: -40px;
      }

      &:after {
        ${markValue};
        position: absolute;
        bottom: -25px;
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

export const MarkInput = styled.input`
  position: relative;
  margin: 0 10px;
  font-size: 1.2rem;
  border: 0;
  width: 60px;
`;
MarkInput.displayName = "MarkInput";

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

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;
MarkLabel.displayName = "MarkLabel";

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
  border-radius: 5px;
  height: 10px;
  width: 80%;
  padding: 0;
  background: lightgray;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
`;
Slider.displayName = "Slider";
