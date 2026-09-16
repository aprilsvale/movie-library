import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import favouritesReducer from "../features/favourites/favouritesSlice";
const storage = {
    getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key: string, value: string) => Promise.resolve(window.localStorage.setItem(key, value)),
    removeItem: (key: string) => Promise.resolve(window.localStorage.removeItem(key)),
};

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["favourites"],
};

const rootReducer = combineReducers({
    favourites: favouritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;