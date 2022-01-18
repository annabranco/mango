import styled, { css } from "styled-components";

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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  color: lightgray;
  cursor: pointer;
  user-select: none;

  ${({ currentSelection, value }) =>
    currentSelection &&
    css`
      position: relative;
      background: red;
      border-radius: 50%;
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
`;
Mark.displayName = "Mark";

export const MarkLabel = styled.label`
  margin: 0 10px;
  font-size: 0.9rem;
`;
MarkLabel.displayName = "MarkLabel";
