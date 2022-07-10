import styled  from 'styled-components/native';

export const ButtonContainer = styled.Pressable`
  height: 50px;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 4px;
  display:flex;
  justify-content: center;
  align-content: center;
  margin: 10px auto;
  width: 90%;
`

export const Text = styled.Text`
color:${({theme}) => theme.colors.background};
margin: auto;
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: 'large',
  color: theme.colors.main,
}))`
  padding: 50px;
`
