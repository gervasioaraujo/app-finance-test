import styled from 'styled-components';

// background-color: ${({ theme }) => theme.color.white};
export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.white};
  margin-bottom: 10px;
  border-radius: 2px;
`

export const MainBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const DetailsBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`