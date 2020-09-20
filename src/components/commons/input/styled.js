import styled, { css } from 'styled-components';
import { TextInputMask } from 'react-native-masked-text';

const styles = css`
  background-color: ${({ theme }) => theme.color.grayLight};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`

export const StyledInput = styled.TextInput`
  ${styles}
`

export const StyledInputMask = styled(TextInputMask)`
  ${styles}
`;

