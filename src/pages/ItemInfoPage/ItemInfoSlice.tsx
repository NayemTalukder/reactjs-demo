import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { ItemInfoState } from './interface'
import { Items } from '../../services/firebase/model'

const initialState: ItemInfoState = {
  updateList: [],
  deleteList: [],
  currentId: '',
  recentEditedField: '',
  editedCat: '',
  editedUnitName: '',
  editedStockLimit: 0,
}

export const ItemInfoSlice = createSlice({
  name: 'ItemInfo',
  initialState,
  reducers: {
    setUpdateList: (state, action: PayloadAction<Array<Items>>) => {
      state.updateList = action.payload
    },
    setDeleteList: (state, action: PayloadAction<Items>) => {
      state.deleteList = [...state.deleteList, action.payload]
    },
    setCurrentId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload
    },
    setRecentEditedField: (state, action: PayloadAction<string>) => {
      state.recentEditedField = action.payload
    },
    setEditedCat: (state, action: PayloadAction<string>) => {
      state.editedCat = action.payload
    },
    setEditedUnitName: (state, action: PayloadAction<string>) => {
      state.editedUnitName = action.payload
    },
    setEditedStockLimit: (state, action: PayloadAction<number>) => {
      state.editedStockLimit = action.payload
    },
    resetItemInfoState: (state) => {
      state.updateList = [];
      state.deleteList = [];
      state.currentId = '';
      state.recentEditedField = '';
      state.editedCat = '';
      state.editedUnitName = '';
      state.editedStockLimit = 0
    },
  },
})

export const { setUpdateList, setDeleteList, setCurrentId, setRecentEditedField, setEditedCat, setEditedUnitName, setEditedStockLimit, resetItemInfoState } = ItemInfoSlice.actions

export const selectItemInfo = (state: RootState) => state.ItemInfo

export default ItemInfoSlice.reducer