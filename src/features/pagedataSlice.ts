import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PageData } from "../types/types";



type PageDataState = PageData[];

const initialState: PageDataState = [];

export const pagedDataSlice = createSlice({
    name: "pageData",
    initialState,
    reducers: {
        addPageData: (state, action: PayloadAction<PageData>) => {
            state.push(action.payload);
        },
    },
});

export const { addPageData } = pagedDataSlice.actions;
export default pagedDataSlice.reducer;

