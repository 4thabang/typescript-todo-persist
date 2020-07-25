import styled from "styled-components";

export const Button = styled.button`
  color: white;
  background-color: violet;
  border: 1px solid violet;
  border-radius: 0.625rem;
  padding-inline-end: 20px;
  padding-inline-start: 20px;
  margin: 0.625rem;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: ease-in 0.1s;
  &:hover {
    border-radius: 0.625rem;
    background-color: purple;
  }
`;

export const Input = styled.input`
  border-radius: 0.625rem;
  border: none;
  padding: 10px;
  box-shadow: 0 0px 30px 0 rgba(0, 0, 0, 0.1);
`;

export const Box = styled.div`
  display: inline-flex;
`;

export const Box1 = styled.div`
  display: flex;
  margin: 0.625rem;
  flex-direction: column;
  align-items: center;
`;
