import React from 'react';
import { StyledButton, ButtonText, Loading } from './styled'
import PropTypes from 'prop-types'

export default function Button({ text, onPress, loading, ...rest }) {
    return (
        <StyledButton onPress={onPress} {...rest}>
            <ButtonText>{text}</ButtonText>
            {loading && <Loading color="#fff" />}
        </StyledButton>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    loading: PropTypes.bool,
}