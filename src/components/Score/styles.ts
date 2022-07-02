import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ResultTitleProps {
  ranking?: string
}

export const RankingContainer = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  padding: 20px;
  margin: auto;
  background-color: ${({theme}) => theme.colors.main};
  border-radius: 4px;
`

export const RankingItemContainer = styled.View`
  width: 40%;
`

export const RankingTitle = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  margin: 20px 0 5px;
`

export const ResultTitle = styled.Text<ResultTitleProps>`
  color: ${({ theme, ranking }) => {
    if(ranking === 'SS') return theme.colors.god_tier
    if(ranking === 'S') return theme.colors.great
    if(ranking === 'A') return theme.colors.okay
    if(ranking === 'B') return theme.colors.poor
    return theme.colors.poor
    }};
  font-size: ${RFValue(50)}px;
  margin: 5px;
`
