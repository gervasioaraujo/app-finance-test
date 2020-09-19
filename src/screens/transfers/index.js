import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Form, DatePickerButton } from './styled';
import { Text, Input, Button, FeedbackMessage } from '../../components/commons';
import { listBanks, createTransfer } from '../../store/ducks/bankAccounts';
import { formatDateToString } from '../../utils/date';

export default function TransfersScreen() {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [transfer, setTransfer] = useState({ date: new Date() });
    const [validationErrorMsg, setValidationErrorMsg] = useState(null);
    const { bankAccounts } = useSelector(state => state.bankAccountsReducer);
    const dispatch = useDispatch();

    const { sourceBank, destinationBank, value, date } = transfer;

    useEffect(() => {
        init();
    }, []);

    function init() {
        dispatch(listBanks());
    }

    function openDatePicker() {
        setShowDatePicker(true);
    }

    function onChangeSourceBank(sourceBank) {
        setTransfer({ ...transfer, sourceBank });
    }

    function onChangeDestinationBank(destinationBank) {
        setTransfer({ ...transfer, destinationBank });
    }

    function onChangeValue(value) {
        setTransfer({ ...transfer, value });
    }

    function onChangeDate(event, date) {
        setShowDatePicker(false);
        if (date) setTransfer({ ...transfer, date });
    }

    function onPressConfirm() {
        // console.log(transfer);
        dispatch(createTransfer(transfer));
    }

    function cleanValidationErrorMsg() {
        setValidationErrorMsg(null);
    }

    function validateForm() {

        cleanValidationErrorMsg();

        if (!sourceBank) {
            setValidationErrorMsg('Escolha uma conta de origem!');
            return;
        }

        if (!destinationBank) {
            setValidationErrorMsg('Escolha uma conta de destino!');
            return;
        }

        if (sourceBank === destinationBank) {
            setValidationErrorMsg('A conta de origem deve ser diferente da conta de destino!');
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
            <Text value="Nova transferência:" type="label" themeColor="grayDark" />
            {
                validationErrorMsg &&
                <FeedbackMessage text={validationErrorMsg} type="error" />
            }
            <Form>
                <Picker
                    selectedValue={sourceBank}
                    onValueChange={(itemValue) =>
                        onChangeSourceBank(itemValue)
                    }>
                    <Picker.Item label='Conta de origem:' value='' />
                    {bankAccounts.map((b, index) => <Picker.Item key={index} label={b.name} value={b.id} />)}
                </Picker>
                <Picker
                    selectedValue={destinationBank}
                    onValueChange={(itemValue) =>
                        onChangeDestinationBank(itemValue)
                    }>
                    <Picker.Item label='Conta destino:' value='' />
                    {bankAccounts.map((b, index) => <Picker.Item key={index} label={b.name} value={b.id} />)}
                </Picker>
                <Input
                    placeholder='Valor'
                    onChangeText={(text) => onChangeValue(text)}
                    keyboardType="numeric"
                    value={value}
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