import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container, BanksList, BalanceTotalBox, TopBanksBox, StyledScroll } from './styled';
import { Text, Line, FeedbackMessage, ModalSpinner } from '../../components/commons';
import { BankAccountItem } from '../../components/';

import { listBanks } from '../../store/ducks/bankAccounts';
import { numberToCurrencyReal } from '../../utils/currency';

export default function BankAccountsScreen({ history }) {

    const { bankAccounts, isLoading } = useSelector(state => state.bankAccountsReducer);
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
            // const { overdraft } = bank;
            // return total + overdraft;
            const { operations } = bank;
            const bankBalance = operations.reduce((total, operation) => {
                const { type, value } = operation;
                if (type === 'incoming')
                    return total + value;
                else return total - value;
            }, 0);
            return total + bankBalance;
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
            <ModalSpinner visible={isLoading} />
            <StyledScroll showsVerticalScrollIndicator={false}>
                <TopBanksBox>
                    <Text value="Minhas Contas:" type="label" themeColor="grayDark" />
                    <Text
                        value='Nova conta'
                        onPress={() => history.push('/newAccountBank')}
                        themeColor="primary"
                        alignSelf="center"
                        bold
                    />
                </TopBanksBox>
                <Line vertical={5} />
                {bankAccounts.length === 0 &&
                    <FeedbackMessage text="Você ainda não possui nenhuma conta bancária cadastrada." />
                }
                {bankAccounts.length > 0 &&
                    <>
                        <BanksList>
                            {renderBankAccounts()}
                        </BanksList>
                        <BalanceTotalBox>
                            <Text value="Saldo: " type="label" themeColor="grayDark" />
                            {renderBalanceTotal()}
                        </BalanceTotalBox>
                    </>
                }
            </StyledScroll>
        </Container>
    );

};