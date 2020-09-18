import styled from 'styled-components';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.white};
  margin-top: ${StatusBar.currentHeight}px;
`

export const TabNavigator = styled.View`
  flex-direction: row;
  justify-content: space-between;
`