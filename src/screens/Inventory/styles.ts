import styled  from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`