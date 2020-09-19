import React, { useState } from "react";
import PropTypes from 'prop-types';

import { Form, ButtonsBox } from './styled';
import { FeedbackMessage, Input, Button } from '../commons';


export default function RegisterForm({
    user,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onPressConfirm,
    errorMessage,
    actionText,
    isLoading
}) {

    const [validationErrorMsg, setValidationErrorMsg] = useState(null);

    const { username, email, password } = user;

    function cleanValidationErrorMsg() {
        setValidationErrorMsg(null);
    }

    function validateForm() {

        cleanValidationErrorMsg();

        if (!username || !username.trim()) {
            setValidationErrorMsg('O campo Nome de usuário é obrigatório!');
            return;
        }

        if (!email || !email.trim()) {
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
                placeholder='Nome de usuário'
                autoCapitalize='none'
                onChangeText={(text) => onUsernameChange(text)}
                value={username}
            />
            <Input
                placeholder='Email'
                autoCapitalize='none'
                onChangeText={(text) => onEmailChange(text)}
                value={email}
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

RegisterForm.propTypes = {
    user: PropTypes.object,
    onUsernameChange: PropTypes.func,
    onEmailChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onPressConfirm: PropTypes.func,
    errorMessage: PropTypes.string,
    actionText: PropTypes.string,
    isLoading: PropTypes.bool,
};