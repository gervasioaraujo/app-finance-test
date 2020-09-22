import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
`;

export const StyledScroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
}))``;