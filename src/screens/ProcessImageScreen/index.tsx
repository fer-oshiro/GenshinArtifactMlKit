import React, { useEffect, useState } from 'react'
import { Image, useWindowDimensions } from 'react-native'
import {
  ProcessImageNavigationProps,
  ProcessImageRouteProps,
} from '../../navigation/Navigator'
import { recognizeImage, Response } from '../../mlkit'
import { ResponseRenderer } from '../../components/ResponseRenderer'
import { Loading, StyledView, ContainerView } from './styles'
import { ArtifactProvider } from '../../hooks/useArtifactInfo'
import Score from '../../components/Score'
import { Button } from '../../components/ui'

interface ProcessImageScreenProps {
  navigation: ProcessImageNavigationProps
  route: ProcessImageRouteProps
}

export const ProcessImageScreen = ({ route }: ProcessImageScreenProps) => {
  const { width: windowWidth } = useWindowDimensions()
  const [aspectRatio, setAspectRation] = useState(1)
  const [response, setResposne] = useState<Response | undefined>(undefined)
  const [text, setText] = useState<string[]>([])
  const uri = route.params.uri

  useEffect(() => {
    if (uri) {
      proccessImage(uri)
    }
  }, [uri])

  const proccessImage = async (url: string) => {
    if (url) {
      try {
        const response = await recognizeImage(url)
        if (response?.blocks?.length > 0) {
          response.blocks.map(value =>
            setText(prevState => [...prevState, value.text])
          )
          setResposne(response)
          setAspectRation(response.height / response.width)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <StyledView>
      <ArtifactProvider>
      {!!response ? (
        <ContainerView>
          <Image
            source={{ uri }}
            style={{
              width: windowWidth / 2,
              height: (windowWidth * aspectRatio) / 2,
            }}
            resizeMode="cover"
          />
          <ResponseRenderer
            response={response}
            text={text}
            scale={windowWidth / response.width}
          />

          <Score/>
        </ContainerView>
      ) : (
        <Loading />
      )}
      </ArtifactProvider>
    </StyledView>
  )
}
