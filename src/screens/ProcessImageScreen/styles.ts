import styled from 'styled-components/native'

export const StyledView = styled.ScrollView`
  flex: 1;
`

export const ContainerView = styled.View`
  display: flex;
  margin: 20px 0;
  width: 100%;
  align-items: center;
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: 'large',
  color: theme.colors.main,
}))`
  padding: 50px;
`
