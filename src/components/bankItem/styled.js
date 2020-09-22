import styled from 'styled-components';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.white};
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  shadow-color: ${({ theme }) => theme.color.gray};
  shadow-offset: 0 5px;
  elevation: 5;
`