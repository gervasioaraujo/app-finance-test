import styled from 'styled-components';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
  border-radius: 2px;
  margin-vertical: 1px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`