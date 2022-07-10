import {
  allArtifactSets,
  allMainStat,
  slotKey,
  substats as allSubstats,
} from '../../../types/artifactLabel'
import { findClosest } from './findClosest'

function cleanText(text: string) {
  return (Math.round(parseFloat(text.replace(/[^0-9.]/g, '')) * 10) / 10).toString()
}

export function separeteValues(text: string[]) {
  const pSet1 = findClosest(text[8], allArtifactSets)
  const pSet2 = findClosest(text[9], allArtifactSets)

  const minStats = (pSet1.sim || 0) > (pSet2.sim || 0)
  const set = minStats ? pSet1 : pSet2

  const slot = findClosest(text[1], slotKey)

  const addPercent = text[3].includes('%') ? '%' : ''
  const textValue = text[2] + addPercent
  const mainStat = findClosest(textValue, allMainStat)

  const level = parseInt(text[4], 10).toString()

  const substats = [
    {
      ...findClosest(text[5], allSubstats),
      value: cleanText(text[5]),
    },
    {
      ...findClosest(text[6], allSubstats),
      value: cleanText(text[6]),
    },
    {
      ...findClosest(text[7], allSubstats),
      value: cleanText(text[7]),
    },
  ]

  if (!minStats) {
    substats.push({
      ...findClosest(text[8], allSubstats),
      value: cleanText(text[8]),
    })
  }

  return {
    set,
    slot,
    mainStat,
    level,
    substats,
  }
}
