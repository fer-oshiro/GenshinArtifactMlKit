import { MainStatKey } from './../artifact';

export const allMainStat: MainStatsType[] = [
  {id: 'hp', label: 'HP'},
  {id: 'hp_', label: 'HP%'},
  {id: 'atk', label: 'ATK'},
  {id: 'atk_', label: 'ATK%'},
  {id: 'def_', label: 'DEF'},
  {id: 'eleMas', label: 'Elemental Mastery'},
  {id: 'enerRech_', label: 'Energy Recharge'},
  {id: 'critRate_', label: 'Crit Rate'},
  {id: 'critDMG_', label: 'Crit DMG'},
  {id: 'physical_dmg_', label: 'Physical DMG Bonus'},
  {id: 'anemo_dmg_', label: 'Anemo DMG Bonus'},
  {id: 'geo_dmg_', label: 'Geo DMG Bonus'},
  {id: 'electro_dmg_', label: 'Electro DMG Bonus'},
  {id: 'hydro_dmg_', label: 'Hydro DMG Bonus'},
  {id: 'pyro_dmg_', label: 'Pyro DMG Bonus'},
  {id: 'cryo_dmg_', label: 'Cryo DMG Bonus'},
  {id: 'heal_', label: 'Heal%'},
]


export type MainStatsType = {
  id: MainStatKey
  label: string
}
