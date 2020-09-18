import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container } from './styled';
import { Text } from '../../components/commons';
import { UserForm } from '../../components';
import { register } from '../../store/ducks/auth';

export default function RegistrationScreen({ history }) {

    const [user, setUser] = useState({ username: '', email: '', password: '' });

    const {
        authReducer: { isLoading, errorMessage }
    } = useSelector(state => state);
    const dispatch = useDispatch();

    function onEmailChange(email) {
        setUser({ ...user, email });
    }

    function onPasswordChange(password) {
        setUser({ ...user, password });
    }

    function onPressRegister() {
        dispatch(register({ ...user, username: user.email }));
    }

    return (
        <Container>
            <UserForm
                user={user}
                onEmailChange={onEmailChange}
                onPasswordChange={onPasswordChange}
                onPressConfirm={onPressRegister}
                actionText="Cadastrar"
            />
            <Text
                value="Já possui uma conta? Faça o login!"
                onPress={() => history.push("/")}
            />
        </Container>
    );

};