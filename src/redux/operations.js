import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://6523e668ea560a22a4e900c0.mockapi.io";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkApi) => {
        try {
            const { data } = await axios.get("/contacts");
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkApi) => {
        try {
            const { data } = await axios.post("/contacts", contact);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id, thunkApi) => {
        try {
            const { data } = await axios.delete(`/contacts/${id}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);