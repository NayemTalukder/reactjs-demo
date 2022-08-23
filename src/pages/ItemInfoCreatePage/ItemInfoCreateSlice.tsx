import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { ItemInfoCreateState } from './interface'

const initialState: ItemInfoCreateState = {
  name: '',
  type: '',
  subCategories: [],
  unitName: [],
  stockLimit: 0,
  allTypes: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5']
}

export const ItemInfoCreateSlice = createSlice({
  name: 'ItemInfoCreate',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    setSubCategories: (state, action: PayloadAction<string>) => {
      state.subCategories = [...state.subCategories, action.payload]
    },
    setUnitName: (state, action: PayloadAction<string>) => {
      state.unitName = [...state.unitName, action.payload]
    },
    setStockLimit: (state, action: PayloadAction<number>) => {
      state.stockLimit = action.payload
    },
    resetItemInfoCreateState: (state) => {
      state = initialState
    },
  },
})

export const { setName, setType, setSubCategories, setUnitName, setStockLimit, resetItemInfoCreateState } = ItemInfoCreateSlice.actions

export const selectItemInfoCreate = (state: RootState) => state.ItemInfoCreate

export default ItemInfoCreateSlice.reducer