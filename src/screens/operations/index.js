import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Form, DatePickerButton } from './styled';
import { Text, Input, Button, FeedbackMessage } from '../../components/commons';
import { listBanks, createOperation } from '../../store/ducks/bankAccounts';
import { formatDateToString } from '../../utils/date';

export default function OperationsScreen() {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [operation, setOperation] = useState({ date: new Date() });
    const [validationErrorMsg, setValidationErrorMsg] = useState(null);
    const { bankAccounts } = useSelector(state => state.bankAccountsReducer);
    const dispatch = useDispatch();

    const { bank, type, description, value, date } = operation;

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
        // console.log(operation);
        dispatch(createOperation(operation));
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
        <Container
            showsVerticalScrollIndicator={false}
        >
            <Text value="Nova operação:" type="label" themeColor="grayDark" />
            {
                validationErrorMsg &&
                <FeedbackMessage text={validationErrorMsg} type="error" />
            }
            <Form>
                <Picker
                    selectedValue={bank}
                    onValueChange={(itemValue) =>
                        onChangeBank(itemValue)
                    }>
                    <Picker.Item label='Conta bancária:' value='' />
                    {bankAccounts.map((b, index) => <Picker.Item key={index} label={b.name} value={b.id} />)}
                </Picker>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) =>
                        onChangeOperationType(itemValue)
                    }>
                    <Picker.Item label='Tipo de operação:' value='' />
                    <Picker.Item label="Entrada" value="incoming" />
                    <Picker.Item label="Saída" value="outcoming" />
                </Picker>
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
        </Container>
    );

};