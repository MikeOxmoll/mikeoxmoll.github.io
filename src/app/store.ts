import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const stores = configureStore({
  reducer: {

  },
});

export type AppDispatch = typeof stores.dispatch;
export type RootState = ReturnType<typeof stores.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
