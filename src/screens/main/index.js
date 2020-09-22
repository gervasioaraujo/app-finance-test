import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container, OperationsList, BanksList, BanksBox, TopBanksBox, OperationsBox, StyledScroll } from './styled';
import { Text, Line, FeedbackMessage, ModalSpinner } from '../../components/commons';
import { BankItem, OperationItem } from '../../components/';
import { listBanks, listOperations } from '../../store/ducks/bankAccounts';

export default function MainScreen({ history }) {

    const { bankAccounts, operations, isLoading } = useSelector(state => state.bankAccountsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        init();
    }, []);

    function init() {
        dispatch(listBanks());
        dispatch(listOperations());
    }

    function renderBanks() {
        return bankAccounts.map((bank, index) => <BankItem key={index} data={bank} />);
    }

    function renderOperations() {
        return operations.map((operation, index) => <OperationItem key={index} data={operation} />);
    }

    return (
        <Container>
            {isLoading && <ModalSpinner visible={isLoading} />}
            {!isLoading &&
                <StyledScroll showsVerticalScrollIndicator={false}>
                    <BanksBox>
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
                            <BanksList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {renderBanks()}
                            </BanksList>
                        }
                    </BanksBox>

                    <OperationsBox>
                        {operations.length > 0 &&
                            <>
                                <Text value="Minhas Operações:" type="label" themeColor="grayDark" />
                                <Line vertical={5} />

                                <OperationsList>
                                    {renderOperations()}
                                </OperationsList>
                            </>
                        }
                    </OperationsBox>
                </StyledScroll>
            }
        </Container>
    );

};