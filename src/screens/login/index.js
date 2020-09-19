import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container } from './styled';
import { Text } from '../../components/commons';
import { LoginForm } from '../../components';
import { login } from '../../store/ducks/auth';

export default function LoginScreen({ history }) {

    const { isLoading, errorMessage } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const [user, setUser] = useState({});

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