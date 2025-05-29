import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeSlice = {
    color: string;
}

const initialState: ThemeSlice = {
    color: "green"
};

const themeSlice = createSlice({
    name    : "theme",
    initialState,
    reducers: {
        changeColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        }
    }
});

export const {changeColor} = themeSlice.actions;
export default themeSlice.reducer;