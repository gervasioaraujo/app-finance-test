import React from "react";
import PropTypes from 'prop-types';

import { Container } from './styled'
import { Text } from '../commons';
import { numberToCurrencyReal } from '../../utils/currency';

export default function BankItem({ data: { name, balance } }) {

    return (
        <Container>
            <Text value={name} bold />
            <Text
                value={numberToCurrencyReal(balance)}
                type="label"
                themeColor={balance < 0 ? 'textError' : 'primary'}
            />
        </Container>
    );

};

BankItem.propTypes = {
    data: PropTypes.object,
};