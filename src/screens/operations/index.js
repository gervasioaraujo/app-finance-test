import React, { useEffect, useState, useRef } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Form, DatePickerButton, StyledScroll } from './styled';
import { Text, Input, Button, Picker, FeedbackMessage, Line, ModalSpinner } from '../../components/commons';
import { listBanks, createOperation } from '../../store/ducks/bankAccounts';
import { formatDateToString } from '../../utils/date';
import theme from '../../../theme';

export default function OperationsScreen() {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [operation, setOperation] = useState({ date: new Date() });
    const [validationErrorMsg, setValidationErrorMsg] = useState(null);
    const { bankAccounts, isLoading } = useSelector(state => state.bankAccountsReducer);
    const dispatch = useDispatch();

    const { bank, type, description, value, date } = operation;

    const inputCurrencyValueRef = useRef(null);

    useEffect(() => {
        init();
    }, []);

    function init() {
        dispatch(listBanks());
    }

    function openDatePicker() {
        setShowDatePicker(true);
    }

    function onChangeBank(bank) {
        console.log(bank);
        setOperation({ ...operation, bank });
    }

    function onChangeOperationType(type) {
        setOperation({ ...operation, type });
    }

    function onChangeDescription(description) {
        setOperation({ ...operation, description });
    }

    function onChangeValue(value) {
        setOperation({ ...operation, value });
    }

    function onChangeDate(event, date) {
        setShowDatePicker(false);
        if (date) setOperation({ ...operation, date });
    }

    function onPressConfirm() {
        const unmaskedValue = inputCurrencyValueRef.current.getRawValue();
        dispatch(createOperation({...operation, value: unmaskedValue}));
    }

    function cleanValidationErrorMsg() {
        setValidationErrorMsg(null);
    }

    function validateForm() {

        cleanValidationErrorMsg();

        if (!bank) {
            setValidationErrorMsg('Escolha uma conta bancária!');
            return;
        }

        if (!type || !type.trim()) {
            setValidationErrorMsg('Escolha o tipo de operação (Entrada ou Saída)!');
            return;
        }

        if (!description || !description.trim()) {
            setValidationErrorMsg('O campo Descrição é obrigatório!');
            return;
        }
        if (!value || !value.trim()) {
            setValidationErrorMsg('O campo Valor é obrigatório!');
            return;
        }

        onPressConfirm();

    }

    return (
        <Container>
            <ModalSpinner visible={isLoading} />
            <StyledScroll showsVerticalScrollIndicator={false}>
                <Text value="Nova operação:" type="label" themeColor="grayDark" />
                <Line vertical={5} />
                {
                    validationErrorMsg &&
                    <FeedbackMessage text={validationErrorMsg} type="error" />
                }
                <Form>
                    <Picker
                        placeholder={{ label: 'Escolha um banco:', value: null, color: theme.color.grayDark }}
                        onValueChange={(value) => onChangeBank(value)}
                        items={bankAccounts.map(b => { return { label: b.name, value: b.id } })}
                    />
                    <Picker
                        placeholder={{ label: 'Escolha o tipo de operação:', color: theme.color.grayDark }}
                        onValueChange={(value) => onChangeOperationType(value)}
                        items={[
                            { label: 'Entrada', value: 'incoming' },
                            { label: 'Saída', value: 'outcoming' },
                        ]}
                    />
                    <Input
                        placeholder='Descrição'
                        onChangeText={(text) => onChangeDescription(text)}
                        value={description}
                    />
                    <Input
                        placeholder='Valor'
                        onChangeText={(text) => onChangeValue(text)}
                        keyboardType="numeric"
                        value={value}
                        ref={inputCurrencyValueRef}
                        maskType='money'
                    />
                    <DatePickerButton onPress={openDatePicker}>
                        <Text value={formatDateToString(date)} />
                    </DatePickerButton>
                    {
                        showDatePicker &&
                        <DateTimePicker
                            // testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />
                    }
                    <Button
                        text="Confirmar"
                        onPress={validateForm}
                    />
                </Form>
            </StyledScroll>
        </Container>
    );

};