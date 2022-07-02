import { SubstatKey } from "../artifact";

export const substats: SubstatsType[] = [
  {id: "hp", label: "HP"},
  {id: "hp_", label: "HP%"},
  {id: "atk", label: "ATK"},
  {id: "atk_", label: "ATK%"},
  {id: "def", label: "DEF"},
  {id: "def_", label: "DEF%"},
  {id: "eleMas", label: "Elemental Mastery"},
  {id: "enerRech_", label: "Energy Recharge %"},
  {id: "critRate_", label: "CRIT Rate %"},
  {id: "critDMG_", label: "CRIT DMG %"},
];

export type SubstatsType = {
  id: SubstatKey,
  label: string 
}