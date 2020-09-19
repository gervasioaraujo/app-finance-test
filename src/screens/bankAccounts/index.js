import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container, BanksList, BalanceTotalBox } from './styled';
import { Text, Line, FeedbackMessage } from '../../components/commons';
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
            const { overdraft } = bank;
            return total + overdraft;
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
            {bankAccounts.length === 0 &&
                <FeedbackMessage text="Você ainda não possui nenhum banco cadastrado." />
            }
            {bankAccounts.length > 0 &&
                <>
                    <Text value="Contas:" type="label" themeColor="grayDark" />
                    <Line vertical={5} />
                    <BanksList>
                        {renderBankAccounts()}
                    </BanksList>
                    <BalanceTotalBox>
                        <Text value="Saldo disponível: " type="label" themeColor="grayDark" />
                        {renderBalanceTotal()}
                    </BalanceTotalBox>
                </>
            }
            <Text value="Adicionar banco" />
        </Container>
    );

};