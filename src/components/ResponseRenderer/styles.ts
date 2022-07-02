import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 90%;
  padding: 10px;
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

export const ItemContainer = styled.View`
  margin: 5px 20px;
  width: 90%;
`

export const SubstatsContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(15)}px;
  margin: 10px 0;
`

export const MainTitle = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 40px;
  font-weight: bold;
  width: 100%;
  margin: 20px 0;
`

export const SubstatsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 40px;
  font-weight: bold;
  width: 100%;
  margin: 60px 0 20px;
`

export const ValueContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`

