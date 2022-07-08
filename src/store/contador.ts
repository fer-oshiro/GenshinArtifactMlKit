import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

interface CounterState {
  value: number
  text: string
}

const initialState: CounterState = {
  value: 0,
  text: 'string'

}

const contador = createSlice({
  name: 'contador',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = contador.actions

export const selectCount = (state: RootState) => state.contador.value

export default contador.reducer