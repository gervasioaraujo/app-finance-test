import React from "react";
import PropTypes from 'prop-types';

import { Container } from './styled'
import { Text } from '../commons';
import { numberToCurrencyReal } from '../../utils/currency';

export default function BankAccountItem({ data: { name, balance } }) {

    return (
        <Container>
            <Text value={name} />
            <Text
                value={numberToCurrencyReal(balance)}
                themeColor={balance < 0 ? 'textError' : 'primary'}
            />
        </Container>
    );

};

BankAccountItem.propTypes = {
    data: PropTypes.object
};