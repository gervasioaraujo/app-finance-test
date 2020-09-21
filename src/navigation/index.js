import React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import {
    LoginScreen, RegistrationScreen, MainScreen,
    OperationsScreen, TransfersScreen, BankAccountsScreen,
    ProfileScreen, NewAccountBankScreen
} from '../screens';
import { MainContainer, DashboardContainer, TabNavigator } from './styled';
import { CustomTab } from '../components';

export default function AppNavigation() {

    const { isUserLoggedIn } = useSelector(state => state.authReducer);

    if (!isUserLoggedIn) {
        return (
            <NativeRouter>
                {/* <Switch> */}
                <Route exact path="/" component={LoginScreen} />
                <Route path="/registration" component={RegistrationScreen} />
                {/* </Switch> */}
            </NativeRouter>
        );
    }

    return (
        <NativeRouter>

            <MainContainer>

                <Switch>

                    <Route path="/newAccountBank" component={NewAccountBankScreen} />

                    <DashboardContainer>

                        <Route exact path="/" component={MainScreen} />
                        <Route path="/operations" component={OperationsScreen} />
                        <Route path="/transfers" component={TransfersScreen} />
                        <Route path="/bankAccounts" component={BankAccountsScreen} />
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
                            <CustomTab to="/bankAccounts">
                                <MaterialCommunityIcons name="wallet" size={24} color="black" />
                            </CustomTab>
                            <CustomTab to="/profile">
                                <MaterialCommunityIcons name="account" size={24} color="black" />
                            </CustomTab>
                        </TabNavigator>

                    </DashboardContainer>

                </Switch>

            </MainContainer>

        </NativeRouter>
    );
}
