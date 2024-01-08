import {createSlice} from "@reduxjs/toolkit";
import {PAGE} from "../components/constants";

const currentPage = createSlice({
    name: 'currentPage',

    initialState: {
        currentPage: PAGE.HOME
    },
    reducers: {
       
        setCurrentPage: (state, action) =>  {
            state.currentPage = action.payload;
        }
    }
});

export const { setCurrentPage} = currentPage.actions;
export default currentPage.reducer;