import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FIREBASE";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";

const initialState = {
    getListFilmLoading: false,
    getListFilmResult: false,
    getListFilmError: false, 

    keyword: false,
};

export const getFilm = createAsyncThunk("film", () => {
    const filmsRef = ref(db, "films");

    let baseQuery = filmsRef;

    if (keyword) {
        baseQuery = query(baseQuery, equalTo(keyword?.toUpperCase()));
    }

    return new Promise((resolve, reject) => {
        onValue(filmsRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
});

const filmSlice = createSlice({
    name: "film",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getFilm.pending, (state) => {
            state.getListFilmLoading = true;
        });
        builder.addCase(getFilm.fulfilled, (state, action) => {
            state.getListFilmLoading = false;
            state.getListFilmResult = action.payload;
            state.getListFilmError = "";
        });
        builder.addCase(getFilm.rejected, (state, action) => {
            state.getListFilmLoading = false;
            state.getListFilmResult = false;
            state.getListFilmError = action.error.message;
        });
    },
});

export default filmSlice.reducer;