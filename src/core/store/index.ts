import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { STORAGE_KEY } from './types/themeTypes';

const persistConfig = {
  key: STORAGE_KEY,
  storage,
  whitelist: ['theme'], // Persist only the theme slice
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    theme: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;