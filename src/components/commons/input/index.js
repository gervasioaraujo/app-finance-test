import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput, StyledInputMask } from './styled';

export default function Input({ maskType, ...rest }) {

    return maskType ?
        (
            <StyledInputMask type={maskType} {...rest} />
        ) :
        (
            <StyledInput {...rest} />
        )
}

Input.propTypes = {
    maskType: PropTypes.string,
}