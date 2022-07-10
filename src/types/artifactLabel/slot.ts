import { SlotKey } from "../consts"

export const slotKey: SlotKeyType[] = [
  {
    key: 'flower',
    label: 'Flower of Life'
  },
  {
    key: 'plume',
    label: 'Plume of Death'
  },
  {
    key: 'sands',
    label: 'Sands of Eon'
  },
  {
    key: 'goblet',
    label: 'Goblet of Eonothem'
  },
  {
    key: 'circlet',
    label: 'Circlet of Logos'
  }
]

export type SlotKeyType = {
  key: SlotKey
  label: string
}