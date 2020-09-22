import styled from 'styled-components';

export const StyledFeedbackMessage = styled.Text`
  color: ${({ type, theme }) => type === 'error' ?
    theme.color.textError :
    theme.color.primary
  };
  align-self: center;
  text-align: center;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 5px;
  background-color: ${({ type, theme }) => type === 'error' ?
    theme.color.textErrorLight :
    theme.color.primaryLight
  };
`