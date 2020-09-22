import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container, Form, ButtonsBox, StyledScroll } from './styled';
import { Text, Input, Button, FeedbackMessage, Line, ModalSpinner } from '../../components/commons';
import { createBank } from '../../store/ducks/bankAccounts';

export default function NewAccountBankScreen({ history }) {

    const [bankAccount, setBankAccount] = useState({});
    const [validationErrorMsg, setValidationErrorMsg] = useState(null);
    const { isLoading, errorMessage } = useSelector(state => state.bankAccountsReducer);
    const dispatch = useDispatch();

    const { name, overdraft } = bankAccount;

    const inputCurrencyValueRef = useRef(null);

    function onChangeBankName(name) {
        setBankAccount({ ...bankAccount, name });
    }

    function onChangeOverdraft(overdraft) {
        setBankAccount({ ...bankAccount, overdraft });
    }

    function onPressConfirm() {
        const unmaskedValue = inputCurrencyValueRef.current.getRawValue();
        dispatch(createBank({ ...bankAccount, overdraft: unmaskedValue }, history));
    }

    function cleanValidationErrorMsg() {
        setValidationErrorMsg(null);
    }

    function validateForm() {

        cleanValidationErrorMsg();

        if (!name || !name.trim()) {
            setValidationErrorMsg('O campo Nome do banco é obrigatório!');
            return;
        }
        if (!overdraft || !overdraft.trim()) {
            setValidationErrorMsg('O campo Saldo é obrigatório!');
            return;
        }

        onPressConfirm();

    }

    return (
        <Container>
            <ModalSpinner visible={isLoading} />
            <StyledScroll showsVerticalScrollIndicator={false}>
                <Text value="Adicionar banco:" type="label" themeColor="grayDark" />
                <Line vertical={5} />
                {
                    (validationErrorMsg || errorMessage) &&
                    <FeedbackMessage text={validationErrorMsg || errorMessage} type="error" />
                }
                <Form>
                    <Input
                        placeholder='Nome do banco'
                        onChangeText={(text) => onChangeBankName(text)}
                        value={name}
                    />
                    <Input
                        placeholder='Saldo'
                        onChangeText={(text) => onChangeOverdraft(text)}
                        keyboardType="numeric"
                        value={overdraft}
                        ref={inputCurrencyValueRef}
                        maskType='money'
                    />
                    <ButtonsBox>
                        <Button
                            text="Cancelar"
                            onPress={() => history.push('/')}
                            width={49}
                        />
                        <Button
                            text="Salvar"
                            onPress={validateForm}
                            width={49}
                        />
                    </ButtonsBox>
                </Form>
            </StyledScroll>
        </Container>
    );

};