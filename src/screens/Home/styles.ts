import styled  from 'styled-components/native';

export const Container = styled.View`
  flex:1;
  justify-content: center; 
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`

export const Card = styled.View`
  width: 100%;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.main};

`

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.contrast};
`