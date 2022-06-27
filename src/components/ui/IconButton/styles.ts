import styled  from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Button = styled.Pressable`
  width: 50px;
  height: 50px;
  background-color: ${({theme}) => theme.colors.main};
  border-radius: 4px;
  display:flex;
  justify-content: center;
  align-content: center;
  margin-right: 20px;
`

export const IconStyle = styled(Icon)`
  font-size: 30px;
  text-align: center;
  color: ${({theme}) => theme.colors.main_lighter};
`