import React from 'react'
import { useArtifactInfo } from '../../hooks/useArtifactInfo'
import { Button } from '../ui'
import {
  RankingContainer,
  RankingItemContainer,
  RankingTitle,
  ResultTitle,
} from './styles'

const Score = () => {
  const { resultRanking } = useArtifactInfo()

  if(!resultRanking) return <></>
  return (
    <RankingContainer>
      <RankingItemContainer>
        <RankingTitle>CRIT Build </RankingTitle>
        <ResultTitle ranking={resultRanking?.critBuild}>{resultRanking?.critBuild}</ResultTitle>
      </RankingItemContainer>

      <RankingItemContainer>
        <RankingTitle>Energy Recharge</RankingTitle>
        <ResultTitle ranking={resultRanking?.erBuild}>{resultRanking?.erBuild}</ResultTitle>
      </RankingItemContainer>

      <RankingItemContainer>
        <RankingTitle>Defense Scaling</RankingTitle>
        <ResultTitle ranking={resultRanking?.defBuild}>{resultRanking?.defBuild}</ResultTitle>
      </RankingItemContainer>

      <RankingItemContainer>
        <RankingTitle>HP Scaling</RankingTitle>
        <ResultTitle ranking={resultRanking?.hpBuild}>{resultRanking?.hpBuild}</ResultTitle>
      </RankingItemContainer>

      <RankingItemContainer>
        <RankingTitle>Elemental Mastery</RankingTitle>
        <ResultTitle ranking={resultRanking?.emBuild}>{resultRanking?.emBuild}</ResultTitle>
      </RankingItemContainer>

      <Button onPress={() => console.log('oi')}>Salvar</Button>
    </RankingContainer>
  )
}

export default Score
