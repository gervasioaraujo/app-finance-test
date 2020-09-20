import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';

import { Container } from './styled';
import { Text } from '../../components/commons';
import { LoginForm } from '../../components';
import { login, localLogin } from '../../store/ducks/auth';

export default function LoginScreen({ history }) {

    const { isLoading, errorMessage, userToken } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [hasLocalPassword, setHasLocalPassword] = useState(false);

    useEffect(() => {
        checkHasLocalPassword();
    }, []);

    async function checkHasLocalPassword() {
        const hasPassword = await LocalAuthentication.isEnrolledAsync();
        setHasLocalPassword(hasPassword);
    }

    async function _localLogin() {
        const { success } = await LocalAuthentication.authenticateAsync();
        console.log(success);
        dispatch(localLogin(history));
    }

    function onIdentifierChange(identifier) {
        setUser({ ...user, identifier });
    }

    function onPasswordChange(password) {
        setUser({ ...user, password });
    }

    function onPressLogin() {
        dispatch(login(user));
    }

    return (
        <Container>
            <LoginForm
                user={user}
                onEmailChange={onIdentifierChange}
                onPasswordChange={onPasswordChange}
                onPressConfirm={onPressLogin}
                actionText="Login"
                isLoading={isLoading}
                errorMessage={errorMessage}
                localLogin={(hasLocalPassword && userToken) ? _localLogin : null}
            />
            <Text
                value="Não possui uma conta ainda?"
            />
            <Text
                value="Cadastre-se!"
                onPress={() => history.push("registration")}
                textDecorationLine='underline'
                themeColor="primary"
            />
        </Container>
    );

};