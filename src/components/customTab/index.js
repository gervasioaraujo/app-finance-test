import React from "react";
import { Route } from "react-router-native";

import { LinkBox, StyledLink } from './styled';
import theme from '../../../theme';
import { Line } from '../commons';

export default function CustomTab({ children, to }) {

    return (
        <Route
            path={to}
            exact
            children={({ match }) => (
                <LinkBox>
                    {match && <Line height={2} backgroundColor={theme.color.primary} width={90} />}
                    <StyledLink
                        underlayColor={theme.color.grayLighter}
                        to={to}
                    >
                        {children}
                    </StyledLink>
                </LinkBox>
            )}
        />
    );

}