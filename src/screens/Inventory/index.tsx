import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {ImageButton, Button} from '../../components/ui';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker/src/types';
import {SelectScreenNavigationProps} from '../../navigation/Navigator';

import * as routes from '../../navigation/routes';
import { Container } from './styles';
import { IconButton } from '../../components/ui/IconButton';

type SelectImageScreenProps = {
  navigation: SelectScreenNavigationProps;
};

type SelectedProps = 'artifact' | 'weapon' | 'character'

export const Inventory = ({navigation}: SelectImageScreenProps) => {
  const [selected, setSelected] = useState<SelectedProps>('artifact')

  return (
    <Container>
      <ImageButton key="Process Image" onPress={() => setSelected('artifact')} source={require('../../assets/button/artifact.png')}/>
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

      <IconButton onPress={() => navigation.navigate(routes.SELECT_SCREEN, {
        selected: selected
      })} name='plus-circle' />

            
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
});
