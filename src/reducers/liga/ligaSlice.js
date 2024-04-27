import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FIREBASE";
import { ref, onValue } from "firebase/database";

const initialState = {
    getListLigaLoading: false,
    getListLigaResult: false,
    getListLigaError: false,

    getDetailLigaLoading: false,
    getDetailLigaResult: false,
    getDetailLigaError: false,
};

export const getLiga = createAsyncThunk("liga", () => {
    const ligasRef = ref(db, "ligas");

    return new Promise((resolve, reject) => {
        onValue(ligasRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
});

export const getDetailLiga = createAsyncThunk("detailliga", (id) => {
    const ligasRef = ref(db, "ligas/" + id);

    return new Promise((resolve, reject) => {
        onValue(ligasRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
});

const ligaSlice = createSlice({
    name: "liga",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLiga.pending, (state) => {
            state.getListLigaLoading = true;
        });
        builder.addCase(getLiga.fulfilled, (state, action) => {
            state.getListLigaLoading = false;
            state.getListLigaResult = action.payload;
            state.getListLigaError = "";
        });
        builder.addCase(getLiga.rejected, (state, action) => {
            state.getListLigaLoading = false;
            state.getListLigaResult = false;
            state.getListLigaError = action.error.message;
        });

        builder.addCase(getDetailLiga.pending, (state) => {
            state.getDetailLigaLoading = true;
        });
        builder.addCase(getDetailLiga.fulfilled, (state, action) => {
            state.getDetailLigaLoading = false;
            state.getDetailLigaResult = action.payload;
            state.getDetailLigaError = "";
        });
        builder.addCase(getDetailLiga.rejected, (state, action) => {
            state.getDetailLigaLoading = false;
            state.getDetailLigaResult = false;
            state.getDetailLigaError = action.error.message;
        });
    },
});

export default ligaSlice.reducer;