import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ItemInfoCreateReducer from '../pages/ItemInfoCreatePage/ItemInfoCreateSlice'
import ItemInfoReducer from '../pages/ItemInfoPage/ItemInfoSlice'
import ModalReducer from '../components/Modal/ModalSlice'

export const store = configureStore({
  reducer: {
    ItemInfoCreate: ItemInfoCreateReducer,
    ItemInfo: ItemInfoReducer,
    Modal: ModalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
