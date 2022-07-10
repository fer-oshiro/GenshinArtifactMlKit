import React, { createContext, useContext, useState } from 'react'
import { similarity } from '../assets/functions/similarity'
import { allMainStatKeys, MainStatKey } from '../types/artifact'
import {
  allArtifactSets,
  allMainStat,
  ArtifactSetsType,
  MainStatsType,
  slotKey,
  SlotKeyType,
  substats,
  SubstatsType,
} from '../types/artifactLabel'
import { SlotKey } from '../types/consts'

interface ArtifactProviderProps {
  children: React.ReactNode
}

interface IArtifactContext {
  getResponse: (t: string[]) => void
  handleRankingCalc: () => boolean
  resultRanking?: RankingProps
  setArtifactSet: (t: PossibleSetProps) => void
  setArtifactSlot: (t: PossibleSlotKeyProps) => void
  setArtifactStats: (t: PossibleMainStatsProps) => void
  setLevel: (t: number) => void
  setFirstStats: (t: PossiblesSubstatsProps) => void
  setSecondStats: (t: PossiblesSubstatsProps) => void
  setThirdStats: (t: PossiblesSubstatsProps) => void
  setFourthStats: (t: PossiblesSubstatsProps | undefined) => void
  result: any
}

interface PossiblesSubstatsProps extends SubstatsType {
  sim?: number
  value?: number
}

interface PossibleSlotKeyProps extends SlotKeyType {
  sim?: number
}

interface PossibleSetProps extends ArtifactSetsType {
  sim?: number
}

interface PossibleMainStatsProps extends MainStatsType {
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

const ArtifactItemContext = createContext({} as IArtifactContext)

function getArtifactSets(text: string) {
  const defaultValue = similarity(allArtifactSets[0].label, text)
  const defaultKey = allArtifactSets[0]

  const possibleArtifact = allArtifactSets.reduce(
    (prev: PossibleSetProps, curr: PossibleSetProps) => {
      const simValue = similarity(text, curr.label)
      const prevSim = prev.sim || 0
      if (prevSim < simValue) return { sim: simValue, ...curr }
      return prev
    },
    { sim: defaultValue, ...defaultKey }
  )

  return possibleArtifact
}

function getArtifactsSlot(text: string) {
  const defaultValue = similarity(slotKey[0].label, text)
  const defaultKey = slotKey[0]

  const probabileSlot = slotKey.reduce(
    (prev: PossibleSlotKeyProps, curr: PossibleSlotKeyProps) => {
      const simValue = similarity(text, curr.label)
      const prevSim = prev?.sim || 0

      if (prevSim < simValue) return { sim: simValue, ...curr }
      return prev
    },
    { sim: defaultValue, ...defaultKey }
  )

  return probabileSlot
}

function getArtifactsMainStat(text: string, value: string) {
  const addPercent = value.includes('%') ? '%' : ''
  const textValue = text + addPercent

  const defaultValue = similarity(allMainStat[0].label, text)
  const defaultKey = allMainStat[0]

  return allMainStat.reduce(
    (prev: PossibleMainStatsProps, curr: PossibleMainStatsProps) => {
      const simValue = similarity(textValue.replace(/[0-9]/g, ''), curr.label)
      const prevSim = prev.sim || 0
      if (prevSim < simValue) return { sim: simValue, ...curr }
      return prev
    },
    { sim: defaultValue, ...defaultKey }
  )
}

function getArtifactSubstats(text: string) {
  const defaultValue = similarity(substats[0].label, text)
  const defaultKey = substats[0]

  const stats: PossiblesSubstatsProps = substats.reduce(
    (prev: PossiblesSubstatsProps, cur: PossiblesSubstatsProps) => {
      const similarityValue = similarity(cur.label, text)
      const prevSim = prev?.sim || 0
      if (similarityValue > prevSim) {
        return {
          sim: similarityValue,
          id: cur.key,
          value: 0,
          label: cur.label,
        }
      }
      return prev
    },
    { sim: defaultValue, value: 0, ...defaultKey }
  )

  stats.value = Math.round(parseFloat(text.replace(/[^0-9.]/g, '')) * 10) / 10
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
  allStats: (PossiblesSubstatsProps | undefined)[],
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
      if (curr) {
        if (simple.includes(curr.key)) {
          return prev + (curr.value || 0)
        }
        if (curr.key === 'critRate_') {
          return prev + (curr.value || 0) * 2
        }
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

export type RankingProps = {
  critBuild: string
  erBuild: string
  defBuild: string
  hpBuild: string
  emBuild: string
}

export const ArtifactProvider = ({ children }: ArtifactProviderProps) => {
  const [artifactset, setArtifactSet] = useState<undefined | PossibleSetProps>()
  const [artifactslot, setArtifactSlot] = useState<
    undefined | PossibleSlotKeyProps
  >()
  const [artifactstats, setArtifactStats] = useState<
    undefined | PossibleMainStatsProps
  >()
  const [level, setLevel] = useState<number>(0)
  const [firstStats, setFirstStats] = useState<
    undefined | PossiblesSubstatsProps
  >()
  const [secondStats, setSecondStats] = useState<
    undefined | PossiblesSubstatsProps
  >()
  const [thirdStats, setThirdStats] = useState<
    undefined | PossiblesSubstatsProps
  >()
  const [fourthStats, setFourthStats] = useState<
    undefined | PossiblesSubstatsProps
  >()

  const result = {
    artifactset,
    artifactslot,
    artifactstats,
    level,
    firstStats,
    secondStats,
    thirdStats,
    fourthStats,
  }

  const [resultRanking, setResultRanking] = useState<RankingProps | undefined>()

  function getResponse(textResponse: string[]) {
    const formatText = textResponse.reduce((prev: string[], curr: string) => {
      const regex = /[%|\d][a-zA-Z]/
      const formatString = JSON.parse(JSON.stringify(curr.replace(/\s/g, '')))
      const indexRegex = regex.exec(formatString)
      if (!!indexRegex) {
        return [
          ...prev,
          formatString.slice(0, indexRegex.index + 1),
          formatString.slice(indexRegex.index + 1),
        ]
      }
      return [...prev, formatString]
    }, [])

    const pSet1 = getArtifactSets(formatText[8])
    const pSet2 = getArtifactSets(formatText[9])
    const pSet = (pSet1.sim || 0) > (pSet2.sim || 0) ? pSet1 : pSet2

    setArtifactSet(pSet)
    setArtifactSlot(getArtifactsSlot(formatText[1]))
    setArtifactStats(getArtifactsMainStat(formatText[2], formatText[3]))
    setLevel(parseInt(formatText[4], 10))
    setFirstStats(getArtifactSubstats(formatText[5]))
    setSecondStats(getArtifactSubstats(formatText[6]))
    setThirdStats(getArtifactSubstats(formatText[7]))
    if ((pSet1.sim || 0) < (pSet2.sim || 0)) {
      setFourthStats(getArtifactSubstats(formatText[8]))
    }
  }

  function handleRankingCalc() {
    const allStats = [firstStats, secondStats, thirdStats, fourthStats]
    const isMax = level === 20

    if (!artifactslot || !artifactstats) return false

    const critBuild = getRanking(
      'atk_',
      allStats,
      artifactslot.key,
      artifactstats.key,
      isMax
    )
    const erBuild = getRanking(
      'enerRech_',
      allStats,
      artifactslot.key,
      artifactstats.key,
      isMax
    )
    const defBuild = getRanking(
      'def_',
      allStats,
      artifactslot.key,
      artifactstats.key,
      isMax
    )
    const hpBuild = getRanking(
      'hp_',
      allStats,
      artifactslot.key,
      artifactstats.key,
      isMax
    )
    const emBuild = getRanking(
      'eleMas',
      allStats,
      artifactslot.key,
      artifactstats.key,
      isMax
    )

    const formatResultRanking = {
      critBuild,
      erBuild,
      defBuild,
      hpBuild,
      emBuild,
    }
    setResultRanking(formatResultRanking)

    return true
  }

  return (
    <ArtifactItemContext.Provider
      value={{
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
      }}
    >
      {children}
    </ArtifactItemContext.Provider>
  )
}

export const useArtifactInfo = () => useContext(ArtifactItemContext)
