import { configureStore } from "@reduxjs/toolkit";
import pageDataReducer from "../features/pagedataSlice"
import { dataApi } from "../helper/service";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    pageData: pageDataReducer,
    [dataApi.reducerPath]: dataApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);