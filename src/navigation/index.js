import React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";
import { useSelector } from 'react-redux';

import {
    LoginScreen, RegistrationScreen, MainScreen,
    OperationsScreen, TransfersScreen, BankAccountsScreen,
    ProfileScreen, NewAccountBankScreen
} from '../screens';
import { MainContainer, DashboardContainer, TabNavigator } from './styled';
import { CustomTab } from '../components';
import theme from '../../theme';

const TABS = [
    { path: '/', iconName: 'home', component: MainScreen },
    { path: '/operations', iconName: 'wallet-plus', component: OperationsScreen },
    { path: '/transfers', iconName: 'bank-transfer', component: TransfersScreen },
    { path: '/bankAccounts', iconName: 'wallet', component: BankAccountsScreen },
    { path: '/profile', iconName: 'account', component: ProfileScreen },
];

export default function AppNavigation() {

    const { isUserLoggedIn } = useSelector(state => state.authReducer);

    // if (!isUserLoggedIn) {
    //     return (
    //         <NativeRouter>
    //             <Route exact path="/" component={LoginScreen} />
    //             <Route path="/registration" component={RegistrationScreen} />
    //         </NativeRouter>
    //     );
    // }

    return (
        <NativeRouter>

            <MainContainer>

                <Switch>

                    <Route path="/newAccountBank" component={NewAccountBankScreen} />

                    <DashboardContainer>

                        {
                            TABS.map((tab, index) =>
                                (tab.path === "/")
                                    ?
                                    <Route key={index} exact path={tab.path} component={tab.component} />
                                    :
                                    <Route key={index} path={tab.path} component={tab.component} />
                            )
                        }

                        <TabNavigator>
                            {
                                TABS.map((tab, index) =>
                                    <CustomTab key={index} to={tab.path} iconName={tab.iconName} />
                                )
                            }
                        </TabNavigator>

                    </DashboardContainer>

                </Switch>

            </MainContainer>

        </NativeRouter>
    );
}
