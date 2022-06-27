import styled from "styled-components/native";
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.TouchableOpacity.attrs({activeOpacity:0.7})`
  background-color: ${({theme}) => theme.colors.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
`

export const Category = styled.Text`
  color: ${({theme}) => theme.colors.contrast};
  font-size: 14px;
  padding: 18px 16px;
`

export const Icon = styled(Feather)`
  font-size: 20px;
  padding: 16px;
`