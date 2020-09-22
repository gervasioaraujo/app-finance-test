import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container, ProfileBox } from './styled';
import { Text } from '../../components/commons';
import { logout } from '../../store/ducks/auth';
import theme from '../../../theme';

export default function ProfileScreen({ history }) {

    const { user: { email } } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    function onPressLogout() {
        dispatch(logout());
        history.push("/");
    }

    return (
        <Container>
            <ProfileBox>
                <MaterialCommunityIcons name="account-circle" size={100} color={theme.color.grayDarker} />
                <Text value={email} type="title" themeColor="grayDarker" bold />
            </ProfileBox>
            <Text
                value='Logout'
                onPress={onPressLogout}
                themeColor="primary"
                bold
            />
        </Container>
    );

};