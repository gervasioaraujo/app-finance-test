import React from "react";
import { Route } from "react-router-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { LinkBox, StyledLink } from './styled';
import theme from '../../../theme';
import { Line } from '../commons';

export default function CustomTab({ iconName, to }) {

    return (
        <Route
            path={to}
            exact
            children={({ match }) => (
                <LinkBox>
                    {match && <Line height={1} backgroundColor={theme.color.primary} width={90} />}
                    <StyledLink
                        underlayColor={theme.color.grayLighter}
                        to={to}
                    >
                        {match ?
                            <MaterialCommunityIcons name={iconName} size={24} color={theme.color.primary} /> :
                            <MaterialCommunityIcons name={iconName} size={24} color={theme.color.grayDarker} />
                        }
                    </StyledLink>
                </LinkBox>
            )}
        />
    );

}