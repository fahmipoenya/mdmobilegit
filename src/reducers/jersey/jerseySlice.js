import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FIREBASE";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";

const initialState = {
    getListJerseyLoading: false,
    getListJerseyResult: false,
    getListJerseyError: false,

    idLiga: false,
    namaLiga: false,
    keyword: false,
};

export const getJersey = createAsyncThunk("jersey", ({ idLiga, keyword }) => {
    const jerseysRef = ref(db, "jerseys");

    let baseQuery = jerseysRef;

    if (idLiga) {
        baseQuery = query(baseQuery, orderByChild("liga"), equalTo(idLiga));
    }

    if (keyword) {
        baseQuery = query(baseQuery, orderByChild("klub"), equalTo(keyword?.toUpperCase()));
    }

    return new Promise((resolve, reject) => {
        onValue(baseQuery, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
});

export const getLimitJersey = createAsyncThunk("limitjersey", () => {
    const jerseysRef = ref(db, "jerseys");

    return new Promise((resolve, reject) => {
        onValue(jerseysRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
});

const jerseySlice = createSlice({
    name: "jersey",
    initialState,
    reducers: {
        getJerseyByLiga: (state, action) => {
            state.idLiga = action.payload.idLiga;
            state.namaLiga = action.payload.namaLiga;
            state.keyword = false;
        },
        deleteParameterJersey: (state, action) => {
            state.idLiga = false;
            state.namaLiga = false;
            state.keyword = false;
        },
        saveKeywordJersey: (state, action) => {
            state.keyword = action.payload;
            state.idLiga = false;
            state.namaLiga = false;
        },
    },
    extraReducers: (builder) => {
        // GET JERSEY
        builder.addCase(getJersey.pending, (state) => {
            state.getListJerseyLoading = true;
        });
        builder.addCase(getJersey.fulfilled, (state, action) => {
            state.getListJerseyLoading = false;
            state.getListJerseyResult = action.payload;
            state.getListJerseyError = "";
        });
        builder.addCase(getJersey.rejected, (state, action) => {
            state.getListJerseyLoading = false;
            state.getListJerseyResult = false;
            state.getListJerseyError = action.error.message;
        });

        // GET LIMIT JERSEY
        builder.addCase(getLimitJersey.pending, (state) => {
            state.getListJerseyLoading = true;
        });
        builder.addCase(getLimitJersey.fulfilled, (state, action) => {
            state.getListJerseyLoading = false;
            state.getListJerseyResult = action.payload;
            state.getListJerseyError = "";
        });
        builder.addCase(getLimitJersey.rejected, (state, action) => {
            state.getListJerseyLoading = false;
            state.getListJerseyResult = false;
            state.getListJerseyError = action.error.message;
        });
    },
});

export default jerseySlice.reducer;
export const { saveKeywordJersey, getJerseyByLiga, deleteParameterJersey } = jerseySlice.actions;
