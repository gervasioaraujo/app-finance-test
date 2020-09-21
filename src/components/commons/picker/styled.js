import styled from 'styled-components';
import RNPickerSelect from 'react-native-picker-select';

export const StyledPicker = styled(RNPickerSelect)`
  background-color: ${({ theme }) => theme.color.grayLight};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

