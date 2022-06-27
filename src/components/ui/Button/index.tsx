import React from 'react';
import { ButtonContainer, Text } from './styles';

interface Props {
  onPress: () => void;
}

export function Button({
  onPress,
  children
}: React.PropsWithChildren<Props>) {
  return (
    <ButtonContainer onPress={onPress}>
      <Text>
        {children}
      </Text>
    </ButtonContainer>
  );
}

