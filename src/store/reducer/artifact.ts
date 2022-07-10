import { createSlice } from '@reduxjs/toolkit'
import { recognizeImage } from '../../mlkit'
import { RootState } from '../configureStore'
import { getCleaningText } from './artifactCleaning/cleaningText'
import { separeteValues } from './artifactCleaning/separeteValues'

interface CounterState {
  loading: boolean
  data: {
    ratio: number
    uri: string
    set: {
      label: string
      key: string
    }
    mainStat: {
      label: string
      key: string
    }
    slot: {
      label: string
      key: string
    }
    level: string
    substats: {
      label: string
      key: string
      value: string
    }[]
  } | null
  error: null
}

type KeyType = 'set' | 'mainStat' | 'slot' | 'level' | 'substats'

const initialState: CounterState = {
  loading: false,
  data: null,
  error: null,
}

const artifact = createSlice({
  name: 'artifact',
  initialState,
  reducers: {
    fetchStarted: state => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    },
    fetchError: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.data = null
    },
    fetchClear: state => {
      state.loading = false
      state.error = null
      state.data = null
    },
    editData: (state, action) => {
      const { value } = action.payload
      const key: KeyType = action.payload.key
      if (state.data) {
        state.data[key] = value
      }
    },
    editSubstats: (state, action) => {
      const { value, substatsIndex } = action.payload
      if (state.data) {
        if (state.data.substats.length > substatsIndex)
          state.data.substats = state.data.substats.map((sub, index) => {
            if (index === substatsIndex) return value
            return sub
          })
        else state.data.substats.push(value)
      }
    },
  },
})

export const { fetchStarted, fetchSuccess, fetchError, fetchClear, editData, editSubstats } =
  artifact.actions

export const fetchTextFromImage = (uri: string) => async (dispatch: any) => {
  if (uri) {
    try {
      dispatch(fetchStarted())
      const response = await recognizeImage(uri)
      if (response?.blocks?.length > 0) {
        const text = response.blocks.map(value => value.text)
        const ratio = response.height / response.width

        const cleanText = getCleaningText(text)
        const values = separeteValues(cleanText)
        return dispatch(fetchSuccess({ ...values, ratio, uri }))
      }
      return dispatch(fetchError('No text found'))
    } catch (error) {
      return dispatch(fetchError(error))
    }
  }
  return dispatch(fetchError('No image'))
}

export const selectArtifact = (state: RootState) => state.artifact.data

export default artifact.reducer
