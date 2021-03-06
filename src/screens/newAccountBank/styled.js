import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
`;

export const StyledScroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center'
  },
}))``;

export const Form = styled.View`
  justify-content: center;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
`

export const ButtonsBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`