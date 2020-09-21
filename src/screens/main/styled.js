import styled from 'styled-components'

// export const Container = styled.ScrollView`
//   flex: 1;
//   background-color: ${({ theme }) => theme.color.white};
//   padding: 10px;
// `

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
`;

export const StyledScroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center'
  },
}))``;

export const BanksBox = styled.View`
  margin-top: 10px;
`

export const TopBanksBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const BanksList = styled.ScrollView`
  background-color: ${({ theme }) => theme.color.white};
  padding-vertical: 10px;
`

export const OperationsBox = styled.View`
  margin-top: 20px;
`

export const OperationsList = styled.View`
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
  margin-bottom: 10px;
`