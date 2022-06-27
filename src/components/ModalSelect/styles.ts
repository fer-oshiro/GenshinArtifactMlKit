import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface CategoryProps {
  isActive: boolean
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${({ theme }) => theme.colors.main};

  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.main_lighter};
`

export const ItemContainer = styled.TouchableOpacity<CategoryProps>`
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.main_lighter : theme.colors.background};
`

export const ItemTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  width: 100%;
  padding: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.contrast};
`

export const Separator = styled.View`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary_light};
`