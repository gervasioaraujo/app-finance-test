import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container, StyledScroll } from './styled';
import { Text } from '../../components/commons';
import { RegisterForm } from '../../components';
import { register } from '../../store/ducks/auth';

export default function RegistrationScreen({ history }) {

    const [user, setUser] = useState({});

    const {
        authReducer: { isLoading, errorMessage }
    } = useSelector(state => state);
    const dispatch = useDispatch();

    function onUsernameChange(username) {
        setUser({ ...user, username });
    }

    function onEmailChange(email) {
        setUser({ ...user, email });
    }

    function onPasswordChange(password) {
        setUser({ ...user, password });
    }

    function onPressRegister() {
        dispatch(register(user, history));
    }

    return (
        <Container>
            <StyledScroll showsVerticalScrollIndicator={false}>
                <RegisterForm
                    user={user}
                    onUsernameChange={onUsernameChange}
                    onEmailChange={onEmailChange}
                    onPasswordChange={onPasswordChange}
                    onPressConfirm={onPressRegister}
                    actionText="Cadastrar"
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                />
                <Text
                    value="Já possui uma conta?"
                />
                <Text
                    value="Faça o login!"
                    onPress={() => history.push("/")}
                    textDecorationLine='underline'
                    themeColor="primary"
                />
            </StyledScroll>
        </Container>
    );

};