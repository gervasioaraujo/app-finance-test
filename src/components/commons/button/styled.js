import styled from 'styled-components';

export const StyledButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.primary};
  width: ${({ width }) => width ? `${width}%` : '100%'};
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.color.white};
`

export const Loading = styled.ActivityIndicator`
  margin-left: 5px;
`