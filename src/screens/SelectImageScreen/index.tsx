import React, {useEffect, useState} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {Button} from '../../components/ui';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker/src/types';
import {SelectScreenNavigationProps} from '../../navigation/Navigator';

import * as routes from '../../navigation/routes';
import {
  Container,
  ButtonContainer,
  ImageContainer,
  ButtonInividualContainer,
} from './styles';

type SelectedProps = 'artifact' | 'weapon' | 'character';

type SelectImageScreenProps = {
  navigation: SelectScreenNavigationProps;
  selected: SelectedProps;
};

export const SelectImageScreen = ({navigation}: SelectImageScreenProps) => {
  const {width: windowWidth} = useWindowDimensions();
  const [aspectRatio, setAspectRation] = useState(1);

  const [response, setResponse] = useState<ImagePickerResponse | null>(null);

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  const onProcessImage = () => {
    if (response) {
      navigation.navigate(routes.PROCESS_IMAGE_SCREEN, {
        uri: response?.assets?.[0]?.uri!!,
      });
    }
  };

  useEffect(() => {
    if (response?.assets?.[0]) {
      const {height, width} = response?.assets?.[0];
      if (height && width) {
        setAspectRation(height / width);
      }
    }
  }, [response]);

  return (
    <Container>
      {response?.assets &&
        response?.assets.map(({uri}) => (
          <ImageContainer key={uri}>
            <Image
              style={{
                width: windowWidth / 2,
                height: windowWidth * aspectRatio,
              }}
              source={{uri: uri}}
            />
          </ImageContainer>
        ))}
      <ButtonContainer>
        <ButtonInividualContainer>
          <Button
            onPress={() =>
              onButtonPress('capture', {
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: false,
              })
            }>
            Take Photo
          </Button>
        </ButtonInividualContainer>
        <ButtonInividualContainer>
          <Button
            onPress={() =>
              onButtonPress('library', {
                selectionLimit: 0,
                mediaType: 'photo',
                includeBase64: false,
              })
            }>
            Add From Galery
          </Button>
        </ButtonInividualContainer>
      </ButtonContainer>
      <Button onPress={onProcessImage}>Process Image</Button>
    </Container>
  );
};
