import { SlotKey } from "../consts"

export const slotKey: SlotKeyType[] = [
  {
    id: 'flower',
    label: 'Flower of Life'
  },
  {
    id: 'plume',
    label: 'Plume of Death'
  },
  {
    id: 'sands',
    label: 'Sands of Eon'
  },
  {
    id: 'goblet',
    label: 'Goblet of Eonothem'
  },
  {
    id: 'circlet',
    label: 'Circlet of Logos'
  }
]

export type SlotKeyType = {
  id: SlotKey
  label: string
}