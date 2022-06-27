import { ArtifactSetKey } from './../consts';

export const allArtifactSets: ArtifactSetsProps[] = [
  { id: 'Icebreaker', label: 'Icebreaker' },
  { id: 'ArchaicPetra', label: 'Archaic Petra' },
  { id: 'BlizzardStrayer', label: 'Blizzard Strayer' },
  { id: 'BloodstainedChivalry', label: 'Bloodstained Chivalry' },
  { id: 'CrimsonWitchOfFlames', label: 'Crimson Witch of Flames' },
  { id: 'EchoesOfAnOffering', label: 'Ender Of an Offering' },
  { id: 'EmblemOfSeveredFate', label: 'Emblem of Severed Fate' },
  { id: 'GladiatorsFinale', label: "Gladiator's Finale" },
  { id: 'HeartOfDepth', label: 'Heart of Depth' },
  { id: 'HuskOfOpulentDreams', label: 'Husk of Opaque Dreams' },
  { id: 'Lavawalker', label: 'Lavawalker' },
  { id: 'MaidenBeloved', label: 'Maiden Beloved' },
  { id: 'NoblesseOblige', label: 'Noblesse Oblige' },
  { id: 'OceanHuedClam', label: 'Ocean-Hued Clam' },
  { id: 'PaleFlame', label: 'Pale Flame' },
  { id: 'RetracingBolide', label: 'Retracing Bolide' },
  { id: 'ShimenawasReminiscence', label: "Shimenawa's Reminiscence" },
  { id: 'TenacityOfTheMillelith', label: 'Tenacity of the Millelith' },
  { id: 'ThunderingFury', label: 'Thundering Fury' },
  { id: 'Thundersoother', label: 'Thundersoother' },
  { id: 'VermillionHereafter', label: 'Vermillion Hereafter' },
  { id: 'ViridescentVenerer', label: 'Viridescent Venerer' },
  { id: 'WanderersTroupe', label: "Wanderer's Troupe" },
]


export type ArtifactSetsProps = {
  id: ArtifactSetKey
  label: string
}