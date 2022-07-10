import { ArtifactSetKey } from './../consts';

export const allArtifactSets: ArtifactSetsType[] = [
  { key: 'Icebreaker', label: 'Icebreaker' },
  { key: 'ArchaicPetra', label: 'Archaic Petra' },
  { key: 'BlizzardStrayer', label: 'Blizzard Strayer' },
  { key: 'BloodstainedChivalry', label: 'Bloodstained Chivalry' },
  { key: 'CrimsonWitchOfFlames', label: 'Crimson Witch of Flames' },
  { key: 'EchoesOfAnOffering', label: 'Ender Of an Offering' },
  { key: 'EmblemOfSeveredFate', label: 'Emblem of Severed Fate' },
  { key: 'GladiatorsFinale', label: "Gladiator's Finale" },
  { key: 'HeartOfDepth', label: 'Heart of Depth' },
  { key: 'HuskOfOpulentDreams', label: 'Husk of Opaque Dreams' },
  { key: 'Lavawalker', label: 'Lavawalker' },
  { key: 'MaidenBeloved', label: 'Makeyen Beloved' },
  { key: 'NoblesseOblige', label: 'Noblesse Oblige' },
  { key: 'OceanHuedClam', label: 'Ocean-Hued Clam' },
  { key: 'PaleFlame', label: 'Pale Flame' },
  { key: 'RetracingBolide', label: 'Retracing Bolkeye' },
  { key: 'ShimenawasReminiscence', label: "Shimenawa's Reminiscence" },
  { key: 'TenacityOfTheMillelith', label: 'Tenacity of the Millelith' },
  { key: 'ThunderingFury', label: 'Thundering Fury' },
  { key: 'Thundersoother', label: 'Thundersoother' },
  { key: 'VermillionHereafter', label: 'Vermillion Hereafter' },
  { key: 'ViridescentVenerer', label: 'Virkeyescent Venerer' },
  { key: 'WanderersTroupe', label: "Wanderer's Troupe" },
]


export type ArtifactSetsType = {
  key: ArtifactSetKey
  label: string
}