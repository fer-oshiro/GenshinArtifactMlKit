import React from 'react';
import { Button, IconStyle } from './styles';

interface Props {
  onPress: () => void;
  name: string
}

export function IconButton({
  onPress,
  name
}: Props) {
  return (
    <Button onPress={onPress}>
      <IconStyle name={name} />
    </Button>
  );
}

