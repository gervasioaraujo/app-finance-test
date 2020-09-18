import React from "react";
import { NativeRouter, Route } from "react-router-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import {
    LoginScreen, RegistrationScreen, MainScreen,
    OperationsScreen, TransfersScreen, BankAccountsScreen, ProfileScreen
} from '../screens';
import { Container, TabNavigator } from './styled';
import { CustomTab } from '../components';

export default function AppNavigation() {

    const { userToken } = useSelector(state => state.authReducer);

    if (userToken === null) {
        return (
            <NativeRouter>
                <Route exact path="/" component={LoginScreen} />
                <Route path="/registration" component={RegistrationScreen} />
            </NativeRouter>
        );
    }

    return (
        <NativeRouter>
            <Container>

                <Route exact path="/" component={MainScreen} />
                <Route path="/operations" component={OperationsScreen} />
                <Route path="/transfers" component={TransfersScreen} />
                <Route path="/bankaccounts" component={BankAccountsScreen} />
                <Route path="/profile" component={ProfileScreen} />

                <TabNavigator>
                    <CustomTab to="/">
                        <MaterialCommunityIcons name="home" size={24} color="black" />
                    </CustomTab>
                    <CustomTab to="/operations">
                        <MaterialCommunityIcons name="wallet-plus" size={24} color="black" />
                    </CustomTab>
                    <CustomTab to="/transfers">
                        <MaterialCommunityIcons name="bank-transfer" size={24} color="black" />
                    </CustomTab>
                    <CustomTab to="/bankaccounts">
                        <MaterialCommunityIcons name="wallet" size={24} color="black" />
                    </CustomTab>
                    <CustomTab to="/profile">
                        <MaterialCommunityIcons name="account" size={24} color="black" />
                    </CustomTab>
                </TabNavigator>

            </Container>
        </NativeRouter>
    );
}
