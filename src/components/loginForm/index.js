import React, { useState } from "react";
import PropTypes from 'prop-types';

import { Form, ButtonsBox } from './styled';
import { FeedbackMessage, Input, Button } from '../commons';


export default function LoginForm({
    user,
    onEmailChange,
    onPasswordChange,
    onPressConfirm,
    errorMessage,
    actionText,
    isLoading
}) {

    const [validationErrorMsg, setValidationErrorMsg] = useState(null);

    const { identifier, password } = user;

    function cleanValidationErrorMsg() {
        setValidationErrorMsg(null);
    }

    function validateForm() {

        cleanValidationErrorMsg();

        if (!identifier || !identifier.trim()) {
            setValidationErrorMsg('O campo Email é obrigatório!');
            return;
        }
        if (!password || !password.trim()) {
            setValidationErrorMsg('O campo Senha é obrigatório!');
            return;
        }

        onPressConfirm();

    }

    return (
        <Form>
            {
                (errorMessage || validationErrorMsg) &&
                <FeedbackMessage text={errorMessage || validationErrorMsg} type="error" />
            }
            <Input
                placeholder='Email'
                autoCapitalize='none'
                onChangeText={(text) => onEmailChange(text)}
                value={identifier}
            />
            <Input
                placeholder='Senha'
                secureTextEntry
                onChangeText={(text) => onPasswordChange(text)}
                value={password}
            />
            <ButtonsBox>
                <Button text={actionText} onPress={validateForm} loading={isLoading} />
            </ButtonsBox>
        </Form>
    );

};

LoginForm.propTypes = {
    user: PropTypes.object,
    onEmailChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onPressConfirm: PropTypes.func,
    errorMessage: PropTypes.string,
    actionText: PropTypes.string,
    isLoading: PropTypes.bool,
};