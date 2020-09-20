import React, { useState } from "react";
import { Platform } from 'react-native';
import PropTypes from 'prop-types';

import { Form } from './styled';
import { FeedbackMessage, Input, Button, Text } from '../commons';


export default function LoginForm({
    user,
    onEmailChange,
    onPasswordChange,
    onPressConfirm,
    errorMessage,
    actionText,
    isLoading,
    localLogin
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
            <Button text={actionText} onPress={validateForm} loading={isLoading} />
            {localLogin &&
                <Text
                    value={ Platform.OS === 'android' ? "Login com digital" : "Login com face id"}
                    onPress={localLogin}
                    textDecorationLine='underline'
                    themeColor="primary"
                    alignSelf="center"
                />
            }
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
    localLogin: PropTypes.func
};