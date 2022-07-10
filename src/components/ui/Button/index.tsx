import React from 'react'
import { ButtonContainer, Text, Loading } from './styles'

interface Props {
  onPress: () => void
  isLoading?: boolean
}

export function Button({
  onPress,
  isLoading,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <ButtonContainer onPress={onPress}>
      {isLoading ? <Loading /> : <Text>{children}</Text>}
    </ButtonContainer>
  )
}
