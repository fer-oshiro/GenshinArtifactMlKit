import { TextInput } from 'react-native';
import styled  from 'styled-components/native';

export const Container = styled(TextInput)`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 4px;
  padding: 18px 16px;
  min-width: 60px;
  text-align: center;
`