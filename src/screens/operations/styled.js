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

export const DatePickerButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.grayLight};
  padding-horizontal: 10px;
  padding-vertical: 15px;
  border-radius: 5px;
  margin-bottom: 5px;
`