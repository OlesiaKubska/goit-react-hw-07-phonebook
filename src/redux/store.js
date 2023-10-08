import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import filterReducer from "./filterSlice";

const rootReducer = {
    contacts: contactsReducer,
    filter: filterReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {},
        }),
});

export default store;