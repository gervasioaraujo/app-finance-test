import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container, BanksList, BalanceTotalBox } from './styled';
import { Text, Line } from '../../components/commons';
import { BankAccountItem } from '../../components/';

import { listBanks } from '../../store/ducks/bankAccounts';
import { numberToCurrencyReal } from '../../utils/currency';

export default function BankAccountsScreen() {

    const { bankAccounts } = useSelector(state => state.bankAccountsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        init();
    }, []);

    function init() {
        dispatch(listBanks());
    }

    function renderBankAccounts() {
        return bankAccounts.map((bank, index) => <BankAccountItem key={index} data={bank} />);
    }

    function renderBalanceTotal() {
        const balanceTotal = bankAccounts.reduce((total, bank) => {
            const { balance } = bank;
            return total + balance;
        }, 0);
        return <Text
            value={numberToCurrencyReal(balanceTotal)}
            bold
            type="body"
            themeColor={balanceTotal < 0 ? 'textError' : 'primary'}
        />
    }

    return (
        <Container>
            <Text value="Contas:" type="label" themeColor="grayDark" />
            <Line vertical={5} />
            <BanksList>
                {renderBankAccounts()}
            </BanksList>
            <BalanceTotalBox>
                <Text value="Saldo total: " type="label" />
                {renderBalanceTotal()}
            </BalanceTotalBox>
        </Container>
    );

};