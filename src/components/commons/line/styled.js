import styled, { css } from 'styled-components'

export const Line = styled.View`
  height: 1px;
  background-color: ${g => g.theme.color.grayLighter};
  width: 100%;
  ${({ backgroundColor }) =>
        backgroundColor &&
        css`
            background-color: ${backgroundColor};
        `}
  ${({ height }) =>
        height &&
        css`
            height: ${height}px;
        `}
  ${({ width }) =>
        width &&
        css`
            width: ${width}%;
        `}
  ${({ vertical }) =>
        vertical &&
        css`
            margin: ${vertical}px 0;
        `}
`