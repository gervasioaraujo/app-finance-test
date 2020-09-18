import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Container, BanksList, BalanceTotalBox } from './styled';
import { Text, Line, Button } from '../../components/commons';
import { BankAccountItem } from '../../components/';

import { logout } from '../../store/ducks/auth';
import { numberToCurrencyReal } from '../../utils/currency';

export default function ProfileScreen({ history }) {

    const { user: { email } } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    function onPressLogout() {
        dispatch(logout());
        history.push("/");
    }

    return (
        <Container>
            <Text value={email} type="title" themeColor="grayDark" bold />
            <Button text="Logout" onPress={onPressLogout} width={40} />
        </Container>
    );

};