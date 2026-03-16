import { combineReducers, configureStore } from '@reduxjs/toolkit';
import  authReducer from '../features/auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: "persist_key",
	storage
}; // storing the redux in localstorage in key value pair

const nestedReducers = combineReducers({
	auth: authReducer,
}); // using the combineReducer feature for nesting the redux slice

const persistedReducer = persistReducer(persistConfig, nestedReducers); // checking the reducer if it has been changed or not helping in updating the persist store by taking the slice reducer in this case we have store all the reducer in nestedReducers

export const store = configureStore({
  reducer: persistedReducer
}) // this is the redux store


export const persistor = persistStore(store); // storing the full redux store in persist store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;