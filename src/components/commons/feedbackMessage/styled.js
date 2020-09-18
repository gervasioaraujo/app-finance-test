import styled from 'styled-components';

export const StyledFeedbackMessage = styled.Text`
  color: ${({ type, theme }) => type === 'error' ?
    theme.color.textError :
    theme.color.primary
  };
  align-self: center;
  margin-bottom: 5px;
`