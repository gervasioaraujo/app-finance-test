import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types'
import theme from '../../../../theme';
import { Wrapper } from './styled';

export default function ModalSpinner({ visible }) {

    return (
        <Modal
            transparent={true}
            visible={visible}
        >
            <Wrapper>
                <ActivityIndicator size="large" color={theme.color.primary} />
            </Wrapper>
        </Modal>
    );

}

ModalSpinner.propTypes = {
    visible: PropTypes.bool,
}