import styled from 'styled-components';

export const Form = styled.View`
  background-color: ${({ theme }) => theme.color.white};
  justify-content: center;
  width: 100%;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
`

export const ButtonsBox = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`