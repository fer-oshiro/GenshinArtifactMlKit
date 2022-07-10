import { MainStatKey } from './../artifact';

export const allMainStat: MainStatsType[] = [
  {key: 'hp', label: 'HP'},
  {key: 'hp_', label: 'HP%'},
  {key: 'atk', label: 'ATK'},
  {key: 'atk_', label: 'ATK%'},
  {key: 'def_', label: 'DEF'},
  {key: 'eleMas', label: 'Elemental Mastery'},
  {key: 'enerRech_', label: 'Energy Recharge'},
  {key: 'critRate_', label: 'Crit Rate'},
  {key: 'critDMG_', label: 'Crit DMG'},
  {key: 'physical_dmg_', label: 'Physical DMG Bonus'},
  {key: 'anemo_dmg_', label: 'Anemo DMG Bonus'},
  {key: 'geo_dmg_', label: 'Geo DMG Bonus'},
  {key: 'electro_dmg_', label: 'Electro DMG Bonus'},
  {key: 'hydro_dmg_', label: 'Hydro DMG Bonus'},
  {key: 'pyro_dmg_', label: 'Pyro DMG Bonus'},
  {key: 'cryo_dmg_', label: 'Cryo DMG Bonus'},
  {key: 'heal_', label: 'Heal%'},
]


export type MainStatsType = {
  key: MainStatKey
  label: string
}
