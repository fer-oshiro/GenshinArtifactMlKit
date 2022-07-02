import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native'

import { useArtifactInfo } from '../../hooks/useArtifactInfo'

import {
  allMainStat,
  slotKey,
  substats,
  allArtifactSets,
  SlotKeyType,
} from '../../types/artifactLabel'

import { ModalSelect } from '../ModalSelect'
import { Select, Input, Button } from '../ui'

import {
  Container,
  ItemContainer,
  MainTitle,
  RankingContainer,
  RankingItemContainer,
  RankingTitle,
  ResultTitle,
  SubstatsContainer,
  SubstatsTitle,
  Title,
  ValueContainer,
} from './styles'

interface ResponseRendererProps {
  text: string[]
}

type OptionType =
  | 'set'
  | 'slot'
  | 'mainStats'
  | 'firstStats'
  | 'secondStats'
  | 'thirdStats'
  | 'fourthStats'

export const ResponseRenderer = ({ text }: ResponseRendererProps) => {
  const {
    getResponse,
    handleRankingCalc,
    resultRanking,
    setArtifactSet,
    setArtifactSlot,
    setArtifactStats,
    setLevel,
    setFirstStats,
    setSecondStats,
    setThirdStats,
    setFourthStats,
    result,
  } = useArtifactInfo()

  const [open, setOpen] = useState(false)
  const [option, setOption] = useState<OptionType>('set')

  function closeSelect() {
    setOpen(false)
  }

  function handleComponent(type: any) {
    setOption(type)
    setOpen(true)
  }

  const defaultSubstats = {
    options: substats,
    title: 'Select Artifact Substats',
  }

  const modalInfo = {
    set: {
      defaultValue: result?.artifactset,
      options: allArtifactSets,
      title: 'Select Artifact Set',
      setValue: (item: ArtifactSetsProps) => setArtifactSet(item),
    },
    slot: {
      defaultValue: result?.artifactslot,
      options: slotKey,
      title: 'Select Artifact Slot',
      setValue: (item: SlotKeyType) => setArtifactSlot(item),
    },
    mainStats: {
      defaultValue: result?.artifactstats,
      options: allMainStat,
      title: 'Select Artifact Main Stats',
      setValue: (item: MainStatsProps) => setArtifactStats(item),
    },
    firstStats: {
      ...defaultSubstats,
      defaultValue: result?.firstStats,
      setValue: (item: SubstatsProps) =>
        setFirstStats(prevStatus => {
          return { ...item, value: prevStatus.value }
        }),
    },
    secondStats: {
      ...defaultSubstats,
      defaultValue: result?.secondStats,
      setValue: (item: SubstatsProps) =>
        setSecondStats(prevStatus => {
          return { ...item, value: prevStatus.value }
        }),
    },
    thirdStats: {
      ...defaultSubstats,
      defaultValue: result?.thirdStats,
      setValue: (item: SubstatsProps) =>
        setThirdStats(prevStatus => {
          return { ...item, value: prevStatus.value }
        }),
    },
    fourthStats: {
      ...defaultSubstats,
      defaultValue: result?.fourthStats,
      setValue: (item: SubstatsProps) =>
        setFourthStats(prevStatus => {
          return { ...item, value: prevStatus.value }
        }),
    },
  }

  useEffect(() => {
    getResponse(text)
  }, [text])

  useEffect(() => {
    console.log('result', result)
  }, [result])

  return (
    <Container>
      <MainTitle>Main</MainTitle>
      <ItemContainer>
        <Title>Artefato</Title>
        <Select
          title={result?.artifactset?.label}
          onPress={() => handleComponent('set')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Slot</Title>
        <Select
          title={result?.artifactslot?.label}
          onPress={() => handleComponent('slot')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Main Stats</Title>
        <Select
          title={result?.artifactstats?.label}
          onPress={() => handleComponent('mainStats')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Level</Title>
        <Input
          defaultValue={result?.level.toFixed(0)}
          onChangeText={text => setLevel(parseFloat(text))}
        />
      </ItemContainer>

      <SubstatsContainer>
        <SubstatsTitle>Substats</SubstatsTitle>
        <ItemContainer>
          <ValueContainer>
            <Select
              title={result?.firstStats?.label}
              onPress={() => handleComponent('firstStats')}
            />
            <Input
              defaultValue={result?.firstStats?.value.toString()}
              onChangeText={text =>
                setFirstStats(prevState => {
                  return { ...prevState, value: text }
                })
              }
            />
          </ValueContainer>
        </ItemContainer>

        <ItemContainer>
          <ValueContainer>
            <Select
              title={result?.secondStats?.label}
              onPress={() => handleComponent('secondStats')}
            />
            <Input
              value={result?.secondStats?.value.toString()}
              onChangeText={text =>
                setSecondStats(prevState => {
                  return { ...prevState, value: text }
                })
              }
            />
          </ValueContainer>
        </ItemContainer>

        <ItemContainer>
          <ValueContainer>
            <Select
              title={result?.thirdStats?.label}
              onPress={() => handleComponent('thirdStats')}
            />
            <Input
              defaultValue={result?.thirdStats?.value.toString()}
              onChangeText={text =>
                setThirdStats(prevState => {
                  return { ...prevState, value: text }
                })
              }
            />
          </ValueContainer>
        </ItemContainer>

        <ItemContainer>
          <ValueContainer>
            <Select
              title={result?.fourthStats?.label}
              onPress={() => handleComponent('fourthStats')}
            />
            <Input
              defaultValue={result?.fourthStats?.value.toString()}
              onChangeText={text =>
                setFourthStats(prevState => {
                  return { ...prevState, value: text }
                })
              }
            />
          </ValueContainer>
        </ItemContainer>
      </SubstatsContainer>

      <Button onPress={handleRankingCalc}>Calcular e Salvar</Button>

      <Container>
        {!!resultRanking && (
          <RankingContainer>
            <RankingItemContainer>
              <RankingTitle>CRIT Build </RankingTitle>
              <ResultTitle>{resultRanking?.critBuild}</ResultTitle>
            </RankingItemContainer>

            <RankingItemContainer>
              <RankingTitle>Energy Recharge</RankingTitle>
              <ResultTitle>{resultRanking?.erBuild}</ResultTitle>
            </RankingItemContainer>

            <RankingItemContainer>
              <RankingTitle>Defense Scaling</RankingTitle>
              <ResultTitle>{resultRanking?.defBuild}</ResultTitle>
            </RankingItemContainer>

            <RankingItemContainer>
              <RankingTitle>HP Scaling</RankingTitle>
              <ResultTitle>{resultRanking?.hpBuild}</ResultTitle>
            </RankingItemContainer>

            <RankingItemContainer>
              <RankingTitle>Elemental Mastery</RankingTitle>
              <ResultTitle>{resultRanking?.emBuild}</ResultTitle>
            </RankingItemContainer>
          </RankingContainer>
        )}
      </Container>
      <Modal visible={open}>
        <ModalSelect {...modalInfo[option]} closeSelect={closeSelect} />
      </Modal>
    </Container>
  )
}
