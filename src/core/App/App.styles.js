import styled from "styled-components";

export const MainArea = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;
MainArea.displayName = "MainArea";

export const SelectionText = styled.p`
  margin: 20px auto 40px;
  margin-left: 15vw;
  width: 100%;
  font-size: 1.4rem;
  text-align: left;
`;
SelectionText.displayName = "SelectionText";
