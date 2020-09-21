import styled from 'styled-components';

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    // flex: 1,
    justifyContent: 'center'
  },
}))`
  flex: 1;
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
`;

export const Form = styled.View`
  background-color: ${({ theme }) => theme.color.white};
  justify-content: center;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
`

export const ButtonsBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`