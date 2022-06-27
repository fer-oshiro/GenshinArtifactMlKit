import styled  from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  display: flex;
`

export const ImageContainer = styled.View`
  margin: auto;
`

export const ImagePreview = styled.Image`
width: 200px;
height: 200px;
display: block;
`

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0 10px;
`

export const ButtonInividualContainer = styled.View`
  flex-grow: 1;
  width: 50%;
`