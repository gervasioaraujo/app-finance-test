import React from 'react'
import { StyledText } from './styled'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

export default function Text(props) {

  const { value, onPress, ...rest } = props

  return !!onPress ? (
    <TouchableOpacity onPress={onPress}>
      <StyledText maxFontSizeMultiplier={1} {...rest}>
        {value}
      </StyledText>
    </TouchableOpacity>
  ) : (
      <StyledText maxFontSizeMultiplier={1} {...rest}>
        {value}
      </StyledText>
    )
}

Text.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  bold: PropTypes.bool,
  themeColor: PropTypes.string,
}
