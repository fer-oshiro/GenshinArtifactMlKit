import { SubstatKey } from "../artifact";

export const substats: SubstatsType[] = [
  {key: "hp", label: "HP"},
  {key: "hp_", label: "HP%"},
  {key: "atk", label: "ATK"},
  {key: "atk_", label: "ATK%"},
  {key: "def", label: "DEF"},
  {key: "def_", label: "DEF%"},
  {key: "eleMas", label: "Elemental Mastery"},
  {key: "enerRech_", label: "Energy Recharge %"},
  {key: "critRate_", label: "CRIT Rate %"},
  {key: "critDMG_", label: "CRIT DMG %"},
];

export type SubstatsType = {
  key: SubstatKey,
  label: string 
}