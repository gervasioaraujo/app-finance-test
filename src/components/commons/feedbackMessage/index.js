import React from 'react'
import { StyledFeedbackMessage } from './styled'
import PropTypes from 'prop-types'

export default function FeedbackMessage({ text, type }) {
    return (
        <StyledFeedbackMessage type={type}>
            {text}
        </StyledFeedbackMessage>
    )
}

FeedbackMessage.propTypes = {
    type: PropTypes.oneOf(['info', 'error']),
    text: PropTypes.string,
}