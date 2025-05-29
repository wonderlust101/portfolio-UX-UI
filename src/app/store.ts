import themeSlice from "@/app/globalSlices/themeSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        theme: themeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;