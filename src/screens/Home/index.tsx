import React from 'react'
import { Modal } from 'react-native'
import { ModalSelect } from '../../components/ModalSelect'
import { Button, Input, Select } from '../../components/ui'
import { decrement, increment } from '../../store/contador'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Card, Container, Text } from './styles'

export function HomeScreen() {
  const state = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  return (
    <Container>
      <Card>
        <Text>Total: {state.contador.value}</Text>
        <Input defaultValue={state.artifact.data?.level} />
        <Button onPress={() => dispatch(increment())}>Incrementar</Button>
        <Button onPress={() => dispatch(decrement())}>Reduzir</Button>
      </Card>
    </Container>
  )
}
