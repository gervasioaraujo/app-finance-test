import React from "react";
import PropTypes from 'prop-types';

import { Container } from './styled'
import { Text } from '../commons';
import { numberToCurrencyReal } from '../../utils/currency';

export default function BankAccountItem({ data: { name, overdraft, operations } }) {

    const bankBalance = operations.reduce((total, operation) => {
        const { type, value } = operation;
        if (type === 'incoming')
            return total + value;
        else return total - value;
    }, 0);

    // console.log(`banco: ${name} - saldo: ${bankBalance}`);

    return (
        <Container>
            <Text value={name} />
            <Text
                // value={numberToCurrencyReal(overdraft)}
                // themeColor={overdraft < 0 ? 'textError' : 'primary'}
                value={numberToCurrencyReal(bankBalance)}
                themeColor={bankBalance < 0 ? 'textError' : 'primary'}
            />
        </Container>
    );

};

BankAccountItem.propTypes = {
    data: PropTypes.object
};