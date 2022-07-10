import React, { useState } from 'react'

import { ImageButton } from '../../components/ui'
import { SelectScreenNavigationProps } from '../../navigation/Navigator'

import * as routes from '../../navigation/routes'
import { Container } from './styles'
import { IconButton } from '../../components/ui/IconButton'
import { TextInput } from 'react-native-gesture-handler'

type SelectImageScreenProps = {
  navigation: SelectScreenNavigationProps
}

type SelectedProps = 'artifact' | 'weapon' | 'character'

export const Inventory = ({ navigation }: SelectImageScreenProps) => {
  const [selected, setSelected] = useState<SelectedProps>('artifact')

  return (
    <Container>
      <ImageButton
        key="Process Image"
        onPress={() => setSelected('artifact')}
        source={require('../../assets/button/artifact.png')}
      />
      <ImageButton
        key="Take Image"
        source={require('../../assets/button/weapon.png')}
        onPress={() => setSelected('weapon')}
      />
      <ImageButton
        key="Select Image"
        source={require('../../assets/button/character.png')}
        onPress={() => setSelected('character')}
      />

      <IconButton
        onPress={() =>
          navigation.navigate(routes.SELECT_SCREEN, {
            selected: selected,
          })
        }
        name="plus-circle"
      />
      <TextInput
        style={{ width: '100%', borderColor: `black`, borderWidth: 2 }}
      />
    </Container>
  )
}
