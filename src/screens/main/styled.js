import styled from 'styled-components'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px;
`

export const BanksBox = styled.View`
  margin-top: 10px;
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