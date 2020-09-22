import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
`;

export const ProfileBox = styled.View`
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  padding: 5px;
`