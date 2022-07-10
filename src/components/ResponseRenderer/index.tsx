import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native'

import { useArtifactInfo } from '../../hooks/useArtifactInfo'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { editData, editSubstats } from '../../store/reducer/artifact'

import {
  allMainStat,
  slotKey,
  substats,
  allArtifactSets,
} from '../../types/artifactLabel'

import { ModalSelect } from '../ModalSelect'
import { Select, Input, Button } from '../ui'

import {
  Container,
  ItemContainer,
  MainTitle,
  SubstatsContainer,
  SubstatsTitle,
  Title,
  ValueContainer,
} from './styles'

type OptionType =
  | 'set'
  | 'slot'
  | 'mainStat'
  | 'firstSubStats'
  | 'secondSubStats'
  | 'thirdSubStats'
  | 'fourthSubStats'

type SelectType = { key: string; label: string }

const substatsIndex = {
  firstSubStats: 0,
  secondSubStats: 1,
  thirdSubStats: 2,
  fourthSubStats: 3,
}

const defaultSubstats = {
  options: substats,
  title: 'Select Artifact Substats',
}

const modalInfo = {
  set: {
    options: allArtifactSets,
    title: 'Select Artifact Set',
  },
  slot: {
    options: slotKey,
    title: 'Select Artifact Slot',
  },
  mainStat: {
    options: allMainStat,
    title: 'Select Artifact Main Stats',
  },
  firstSubStats: {
    ...defaultSubstats,
  },
  secondSubStats: {
    ...defaultSubstats,
  },
  thirdSubStats: {
    ...defaultSubstats,
  },
  fourthSubStats: {
    ...defaultSubstats,
  },
}

export const ResponseRenderer = () => {
  const {
    handleRankingCalc,
    setLevel,
    setFirstStats,
    setSecondStats,
    setThirdStats,
    setFourthStats,
  } = useArtifactInfo()

  const data = useAppSelector(state => state.artifact.data)
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [option, setOption] = useState<OptionType>('set')
  const [select, setSelect] = useState({ key: '', label: '' })

  function closeSelect() {
    setOpen(false)
    changeValues()
  }

  function handleComponent(type: any) {
    setOption(type)
    setOpen(true)
    if (type.endsWith('SubStats')) {
      setSelect(data?.substats[substatsIndex[option]] || { key: '', label: '' })
    } else {
      setSelect(data[type] || { key: '', label: '' })
    }
  }

  function changeValues() {
    if (option.endsWith('SubStats')) {
      const prevValue = data?.substats[substatsIndex[option]]?.value
      dispatch(
        editSubstats({
          value: { value: prevValue, select },
          substatsIndex: substatsIndex[option],
        })
      )
    } else {
      dispatch(editData({ key: option, value: select }))
    }
  }

  function changeSubstatsValues(value: string) {
    if (option.endsWith('SubStats')) {
      const prevValue = data?.substats[substatsIndex[option]]
      dispatch(
        editSubstats({
          value: { ...prevValue, value },
          substatsIndex: substatsIndex[option],
        })
      )
    }
  }

  const updateValue = e => {
    e.preventDefault();
    console.log(e.target.value)
  }
  return (
    <Container>
      <MainTitle>Main</MainTitle>
      <ItemContainer>
        <Title>Artefato</Title>
        <Select
          title={data?.set?.label || ''}
          onPress={() => handleComponent('set')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Slot</Title>
        <Select
          title={data?.slot?.label || ''}
          onPress={() => handleComponent('slot')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Main Stats</Title>
        <Select
          title={data?.mainStat?.label || ''}
          onPress={() => handleComponent('mainStat')}
        />
      </ItemContainer>
      <ItemContainer>
        <Title>Level</Title>
        <Input
          key="level"
          defaultValue={data?.level}
          onChange={text => setLevel(parseFloat(text))}
        />
      </ItemContainer>

      <SubstatsContainer>
        <SubstatsTitle>Substats</SubstatsTitle>
        <ItemContainer>
          <ValueContainer>
            <Select
              title={data?.substats?.[0]?.label || ''}
              onPress={() => handleComponent('firstSubStats')}
            />
            <Input
              defaultValue={data?.substats?.[0]?.value}
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
              title={data?.substats?.[1]?.label || ''}
              onPress={() => handleComponent('secondSubStats')}
            />
            <Input
              value={data?.substats?.[1]?.value}
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
              title={data?.substats?.[2]?.label || ''}
              onPress={() => handleComponent('thirdSubStats')}
            />
            <Input
              defaultValue={data?.substats?.[2]?.value}
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
              title={data?.substats?.[3]?.label || ''}
              onPress={() => handleComponent('fourthSubStats')}
            />
            <Input
              defaultValue={data?.substats?.[3]?.value}
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

      <Modal visible={open} transparent={false} animationType="slide">
        <ModalSelect
          {...modalInfo[option]}
          setValue={(value: SelectType) => setSelect(value)}
          closeSelect={closeSelect}
          value={select}
        />
      </Modal>
    </Container>
  )
}
