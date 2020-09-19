import React from "react";
import PropTypes from 'prop-types';

import { Container, MainBox, DetailsBox } from './styled'
import { Text } from '../commons';
import { numberToCurrencyReal } from '../../utils/currency';
import { formatDateToString } from '../../utils/date';

export default function OperationItem({ data: { description, type, value, bank, created_at } }) {

    return (
        <Container>
            <MainBox>
                <Text value={description} />
                <Text
                    value={type === 'outcoming' ? `-${numberToCurrencyReal(value)}` : `${numberToCurrencyReal(value)}`}
                    themeColor={type === 'outcoming' ? 'textError' : 'primary'}
                    bold
                />
            </MainBox>
            <DetailsBox>
                <Text value={`${bank ? `${bank.name} ` : ''}(${formatDateToString(created_at)})`} type="label" themeColor="grayDarker" />
            </DetailsBox>
        </Container>
    );

};

OperationItem.propTypes = {
    data: PropTypes.object,
};