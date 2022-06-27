import styled  from 'styled-components/native';

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

export const ImageIcon = styled.Image`
  width: 40px;
  height: 40px;
`