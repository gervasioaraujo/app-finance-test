import styled, { css } from 'styled-components'

export const StyledText = styled.Text`
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
  ${({ type }) =>
    type &&
    css`
      font-size: ${g => g.theme.text[type]}px;
    `}
  ${({ themeColor }) =>
    themeColor &&
    css`
      color: ${g => g.theme.color[themeColor]};
    `}
`
