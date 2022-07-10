import { similarity } from "../../../assets/functions/similarity"

type SlotProps = {
  label: string	
  key: string
}

type PossibleSlotProps ={
  similarity: number
  label: string	
  key: string
}

export const  getArtifactsSlot = (text: string, slot: SlotProps[]) => {
  const defaultValue = similarity(slot[0].label, text)
  const defaultKey = slot[0]

  const probabileSlot = slot.reduce(
    (prev: PossibleSlotProps, curr: SlotProps) => {
      const simValue = similarity(text, curr.label)
      const prevSim = prev.similarity

      if (prevSim < simValue) return { similarity: simValue, ...curr }
      return prev
    },
    { similarity: defaultValue, ...defaultKey }
  )

  const {key, label} = probabileSlot

  return {key, label}
}