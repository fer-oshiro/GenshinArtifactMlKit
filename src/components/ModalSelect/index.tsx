import React from 'react'
import { FlatList } from 'react-native'
import { Button } from '../../components/ui'
import { Container, Header, ItemContainer, ItemTitle, Separator, Title } from './styles'

interface ItemProps {
  key: string
  label: string
}

interface Props {
  options: ItemProps[]
  value: ItemProps
  setValue: (item: any) => void
  closeSelect: () => void
  title: string
}

export function ModalSelect({
  options,
  value,
  setValue,
  title,
  closeSelect,
}: Props) {
  return (
      <Container>
        <Header>
          <Title>{title}</Title>
        </Header>

        <FlatList
          data={options}
          style={{ flex: 1, width: '100%' }}
          keyExtractor={item => item.key}
          renderItem={({ item }) => {
            return (
            <ItemContainer onPress={() => setValue(item)} isActive={value.key === item.key}>
              <ItemTitle>{item.label}</ItemTitle>
            </ItemContainer>
          )}}
          ItemSeparatorComponent={() => <Separator/>}
        />
        <Button onPress={closeSelect}>Selecionar</Button>
      </Container>
  )
}
