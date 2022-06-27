import React from 'react';
import { Button, ImageIcon } from './styles';

interface Props {
  onPress: () => void;
  source: any
}

export function ImageButton({
  onPress,
  source
}: Props) {
  return (
    <Button onPress={onPress}>
      <ImageIcon source={source} />
    </Button>
  );
}

