import { similarity } from '../../../assets/functions/similarity'

interface SlotProps {
  label: string
  key: string
}

interface PossibleSlotKeyProps extends SlotProps {
  sim: number
}

export function findClosest(text: string, slot: SlotProps[]) {
  const defaultValue = similarity(slot[0].label, text)
  const defaultKey = slot[0]

  const probabileSlot = slot.reduce(
    (prev: PossibleSlotKeyProps, curr: SlotProps) => {
      const simValue = similarity(text, curr.label)
      const prevSim = prev.sim 

      if (prevSim < simValue) return { sim: simValue, ...curr }
      return prev
    },
    { sim: defaultValue, ...defaultKey }
  )

  return probabileSlot
}
