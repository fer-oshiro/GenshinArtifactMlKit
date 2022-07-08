import React from 'react';
import { Button } from '../../components/ui';
import { decrement, increment } from '../../store/contador';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {Card, Container, Text} from './styles'

export function HomeScreen() {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  console.log(state.contador.text)
  return (
    <Container>
      <Card>
        <Text>Total: {state.contador.value}</Text>
        <Button onPress={() => dispatch(increment())}>Incrementar</Button>
        <Button onPress={() => dispatch(decrement())}>Reduzir</Button>
      </Card>
    </Container>
  );
}