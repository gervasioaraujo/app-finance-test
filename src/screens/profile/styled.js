import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
`;

export const BanksList = styled.View`
  background-color: ${({ theme }) => theme.color.white};
`

export const BalanceTotalBox = styled.View`
  background-color: ${({ theme }) => theme.color.grayLighter};
  margin-top: 5px;
  padding: 10px;
  border-radius: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`