import React, { useState } from 'react'
import { Modal } from 'react-native'

import { similarity } from '../../assets/functions/similarity'
import { allMainStatKeys, MainStatKey } from '../../types/artifact'

import {
  allMainStat,
  slotKey,
  substats,
  allArtifactSets,
  SubstatsProps,
  SlotKeyType,
  ArtifactSetsProps,
  MainStatsProps,
} from '../../types/artifactLabel'
import { SlotKey } from '../../types/consts'

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

interface PossiblesSubstatsProps extends SubstatsProps {
  sim?: number
  value?: number
}

interface PossibleSlotKey extends SlotKeyType {
  sim?: number
}

interface PossibleArtifactSet extends ArtifactSetsProps {
  sim?: number
}

interface PossibleMainStats extends MainStatsProps {
  sim?: number
}

type OptionType =
  | 'set'
  | 'slot'
  | 'mainStats'
  | 'firstStats'
  | 'secondStats'
  | 'thirdStats'
  | 'fourthStats'

function getArtifactSets(text: string) {
  const defaultValue = similarity(allArtifactSets[0].label, text)
  const defaultKey = allArtifactSets[0]

  const possibleArtifact = allArtifactSets.reduce(
    (prev: PossibleArtifactSet, curr: PossibleArtifactSet) => {
      const simValue = similarity(text, curr.label)
      const prevSim = prev.sim || 0
      if (prevSim < simValue) return { sim: simValue, ...curr }
      return prev
    },
    { sim: defaultValue, ...defaultKey }
  )

  return possibleArtifact
}

function getSlotArtifacts(text: string) {
  const defaultValue = similarity(slotKey[0].label, text)
  const defaultKey = slotKey[0]

  const probabileSlot = slotKey.reduce(
    (prev: PossibleSlotKey, curr: PossibleSlotKey) => {
      const simValue = similarity(text, curr.label)
      const prevSim = prev?.sim || 0

      if (prevSim < simValue) return { sim: simValue, ...curr }
      return prev
    },
    { sim: defaultValue, ...defaultKey }
  )

  return probabileSlot
}

function getMainStatArtifacts(text: string, value: string) {
  const addPercent = value.includes('%') ? '%' : ''
  const textValue = text + addPercent

  const defaultValue = similarity(allMainStat[0].label, text)
  const defaultKey = allMainStat[0]

  return allMainStat.reduce(
    (prev: PossibleMainStats, curr: PossibleMainStats) => {
      const simValue = similarity(textValue, curr.label)
      const prevSim = prev.sim || 0
      if (prevSim < simValue) return { sim: simValue, ...curr }
      return prev
    },
    { sim: defaultValue, ...defaultKey }
  )
}

function getSubstatsValue(text: string) {
  const defaultValue = similarity(substats[0].label, text)
  const defaultKey = substats[0]

  const stats: PossiblesSubstatsProps = substats.reduce(
    (prev: PossiblesSubstatsProps, cur: PossiblesSubstatsProps) => {
      const similarityValue = similarity(cur.label, text)
      const prevSim = prev?.sim || 0
      if (similarityValue > prevSim) {
        return {
          sim: similarityValue,
          id: cur.id,
          value: 0,
          label: cur.label,
        }
      }
      return prev
    },
    { sim: defaultValue, value: 0, ...defaultKey }
  )

  stats.value = parseFloat(text.replace(/[^0-9.]/g, ''))
  return stats
}

function getFactor(
  id: SlotKey,
  stats: MainStatKey,
  sands: string[],
  globet: string[],
  circlet: string[]
) {
  let factor = 1

  if (id === 'sands' && sands.includes(stats)) {
    factor = 0.3
  }

  if (id === 'goblet' && globet.includes(stats)) {
    factor = 0.3
  }

  if (id === 'circlet' && circlet.includes(stats)) {
    factor = 0.3
  }

  return factor
}

type TypeBuildProps = 'atk_' | 'enerRech_' | 'def_' | 'hp_' | 'eleMas'

function getRanking(
  type: TypeBuildProps,
  allStats: PossiblesSubstatsProps[],
  slot: SlotKey,
  mainStats: MainStatKey,
  max: boolean
) {
  const globet = allMainStatKeys.filter(value =>
    ['atk_', 'hp_', 'def_', 'eleMas'].includes(value)
  )
  const circlet = ['critRate_', 'critDMG_']
  const factorCrit = getFactor(slot, mainStats, [type], globet, circlet)
  const ranking =
    allStats.reduce((prev, curr) => {
      const simple = ['critDMG_', type]
      if (simple.includes(curr.id)) {
        return prev + (curr.value || 0)
      }
      if (curr.id === 'critRate_') {
        return prev + (curr.value || 0) * 2
      }
      return prev
    }, 0) * factorCrit

  const rantingScore = {
    max: (score: number) => {
      if (score > 45) return 'SS'
      if (score > 35) return 'S'
      if (score > 25) return 'A'
      return 'B'
    },
    other: (score: number) => {
      if (score > 16) return 'SS'
      if (score > 9) return 'S'
      if (score > 6) return 'A'
      return 'B'
    },
    em: (score: number) => {
      if (score > 12) return 'SS'
      if (score > 9) return 'S'
      if (score > 6) return 'A'
      return 'B'
    },
  }

  let score = 'B'

  if (max) {
    score = rantingScore.max(ranking)
  } else if (type === 'eleMas') {
    score = rantingScore.em(ranking)
  } else {
    score = rantingScore.other(ranking)
  }

  return score
}

type RankingProps = {
  critBuild: string
  erBuild: string
  defBuild: string
  hpBuild: string
  emBuild: string
}

export const ResponseRenderer = ({ text }: ResponseRendererProps) => {
  const [artifactset, setArtifactSet] = useState(getArtifactSets(text[9]))
  const [artifactslot, setArtifactSlot] = useState(getSlotArtifacts(text[1]))
  const [artifactstats, setArtifactStats] = useState(
    getMainStatArtifacts(text[2], text[3])
  )
  const [level, setLevel] = useState(parseInt(text[4], 10))
  const [firstStats, setFirstStats] = useState(getSubstatsValue(text[5]))
  const [secondStats, setSecondStats] = useState(getSubstatsValue(text[6]))
  const [thirdStats, setThirdStats] = useState(getSubstatsValue(text[7]))
  const [fourthStats, setFourthStats] = useState(getSubstatsValue(text[8]))

  const [open, setOpen] = useState(false)
  const [option, setOption] = useState<OptionType>('set')
  const [result, setResult] = useState<RankingProps | undefined>()

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
      defaultValue: artifactset,
      options: allArtifactSets,
      title: 'Select Artifact Set',
      setValue: (item: ArtifactSetsProps) => setArtifactSet(item),
    },
    slot: {
      defaultValue: artifactslot,
      options: slotKey,
      title: 'Select Artifact Slot',
      setValue: (item: SlotKeyType) => setArtifactSlot(item),
    },
    mainStats: {
      defaultValue: artifactstats,
      options: allMainStat,
      title: 'Select Artifact Main Stats',
      setValue: (item: MainStatsProps) => setArtifactStats(item),
    },
    firstStats: {
      ...defaultSubstats,
      defaultValue: firstStats,
      setValue: (item: SubstatsProps) =>
        setFirstStats(prevStatus => {
          return { ...item, value: prevStatus.value }
        }),
    },
    secondStats: {
      ...defaultSubstats,
      defaultValue: secondStats,
      setValue: (item: SubstatsProps) =>
        setSecondStats(prevStatus => {
          return { ...item, value: prevStatus.value }
        }),
    },
    thirdStats: {
      ...defaultSubstats,
      defaultValue: thirdStats,
      setValue: (item: SubstatsProps) =>
        setThirdStats(prevStatus => {
          return { ...item, value: prevStatus.value }
        }),
    },
    fourthStats: {
      ...defaultSubstats,
      defaultValue: fourthStats,
      setValue: (item: SubstatsProps) =>
        setFourthStats(prevStatus => {
          return { ...item, value: prevStatus.value }
        }),
    },
  }

  function handleClick() {
    const allStats = [firstStats, secondStats, thirdStats, fourthStats]
    const isMax = level === 20

    const critBuild = getRanking(
      'atk_',
      allStats,
      artifactslot.id,
      artifactstats.id,
      isMax
    )
    const erBuild = getRanking(
      'enerRech_',
      allStats,
      artifactslot.id,
      artifactstats.id,
      isMax
    )
    const defBuild = getRanking(
      'def_',
      allStats,
      artifactslot.id,
      artifactstats.id,
      isMax
    )
    const hpBuild = getRanking(
      'hp_',
      allStats,
      artifactslot.id,
      artifactstats.id,
      isMax
    )
    const emBuild = getRanking(
      'eleMas',
      allStats,
      artifactslot.id,
      artifactstats.id,
      isMax
    )

    const formatResult = { critBuild, erBuild, defBuild, hpBuild, emBuild }
    setResult(formatResult)
  }

  return (
    <Container>
      <MainTitle>Main</MainTitle>
      <ItemContainer>
        <Title>Artefato</Title>
        <Select
          title={artifactset?.label}
          onPress={() => handleComponent('set')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Slot</Title>
        <Select
          title={artifactslot?.label}
          onPress={() => handleComponent('slot')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Main Stats</Title>
        <Select
          title={artifactstats?.label}
          onPress={() => handleComponent('mainStats')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Level</Title>
        <Input
          defaultValue={level.toFixed(0)}
          onChangeText={text => setLevel(parseFloat(text))}
        />
      </ItemContainer>

      <SubstatsContainer>
        <SubstatsTitle>Substats</SubstatsTitle>
        <ItemContainer>
          <ValueContainer>
            <Select
              title={firstStats?.label}
              onPress={() => handleComponent('firstStats')}
            />
            <Input
              defaultValue={firstStats.value?.toFixed(1)}
              onChangeText={text =>
                setFirstStats(prevState => {
                  return { ...prevState, value: parseFloat(text) }
                })
              }
            />
          </ValueContainer>
        </ItemContainer>

        <ItemContainer>
          <ValueContainer>
            <Select
              title={secondStats?.label}
              onPress={() => handleComponent('secondStats')}
            />
            <Input
              defaultValue={secondStats.value?.toFixed(1)}
              onChangeText={text =>
                setSecondStats(prevState => {
                  return { ...prevState, value: parseFloat(text) }
                })
              }
            />
          </ValueContainer>
        </ItemContainer>

        <ItemContainer>
          <ValueContainer>
            <Select
              title={thirdStats?.label}
              onPress={() => handleComponent('thirdStats')}
            />
            <Input
              defaultValue={thirdStats.value?.toFixed(1)}
              onChangeText={text =>
                setThirdStats(prevState => {
                  return { ...prevState, value: parseFloat(text) }
                })
              }
            />
          </ValueContainer>
        </ItemContainer>

        <ItemContainer>
          <ValueContainer>
            <Select
              title={fourthStats?.label}
              onPress={() => handleComponent('fourthStats')}
            />
            <Input
              defaultValue={fourthStats.value?.toFixed(1)}
              onChangeText={text =>
                setFourthStats(prevState => {
                  return { ...prevState, value: parseFloat(text) }
                })
              }
            />
          </ValueContainer>
        </ItemContainer>
      </SubstatsContainer>

      <Button onPress={handleClick}>Calcular e Salvar</Button>

      <Container>
        {!!result && (
          <RankingContainer>
            <RankingItemContainer>
              <RankingTitle>CRIT Build </RankingTitle>
              <ResultTitle>{result?.critBuild}</ResultTitle>
            </RankingItemContainer>

            <RankingItemContainer>
              <RankingTitle>Energy Recharge</RankingTitle>
              <ResultTitle>{result?.erBuild}</ResultTitle>
            </RankingItemContainer>

            <RankingItemContainer>
              <RankingTitle>Defense Scaling</RankingTitle>
              <ResultTitle>{result?.defBuild}</ResultTitle>
            </RankingItemContainer>

            <RankingItemContainer>
              <RankingTitle>HP Scaling</RankingTitle>
              <ResultTitle>{result?.hpBuild}</ResultTitle>
            </RankingItemContainer>

            <RankingItemContainer>
              <RankingTitle>Elemental Mastery</RankingTitle>
              <ResultTitle>{result?.emBuild}</ResultTitle>
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
