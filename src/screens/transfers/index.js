import React, { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Form, DatePickerButton, StyledScroll } from './styled';
import { Text, Input, Button, Picker, FeedbackMessage, Line, ModalSpinner } from '../../components/commons';
import { listBanks, createTransfer } from '../../store/ducks/bankAccounts';
import { formatDateToString } from '../../utils/date';
import theme from '../../../theme';

export default function TransfersScreen() {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [transfer, setTransfer] = useState({ date: new Date() });
    const [validationErrorMsg, setValidationErrorMsg] = useState(null);
    const { bankAccounts, isLoading } = useSelector(state => state.bankAccountsReducer);
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
        <Container>
            <ModalSpinner visible={isLoading} />
            <StyledScroll showsVerticalScrollIndicator={false}>
                <Text value="Nova transferência:" type="label" themeColor="grayDark" />
                <Line vertical={5} />
                {
                    validationErrorMsg &&
                    <FeedbackMessage text={validationErrorMsg} type="error" />
                }
                <Form>
                    <Picker
                        placeholder={{ label: 'Conta de origem:', value: null, color: theme.color.grayDark }}
                        onValueChange={(value) => onChangeSourceBank(value)}
                        items={bankAccounts.map(b => { return { label: b.name, value: b.id } })}
                    />
                    <Picker
                        placeholder={{ label: 'Conta destino:', value: null, color: theme.color.grayDark }}
                        onValueChange={(value) => onChangeDestinationBank(value)}
                        items={bankAccounts.map(b => {
                            return { label: b.name, value: b.id };
                        })}
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
            </StyledScroll>
        </Container>
    );

};