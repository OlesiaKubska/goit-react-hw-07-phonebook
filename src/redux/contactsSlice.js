import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://your-endpoint-from-mockapi.io/contacts";

const initialState = {
    items: [],
    isLoading: false,
    error: null
};

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async () => {
        const response = await fetch(API_URL);
        return response.json();
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        });
        return response.json();
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id) => {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        return id;
    }
);

const contactsSlice = createSlice({
    name: "contacts",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter((contact) => contact.id !== action.payload);
            });
    }
});

export default contactsSlice.reducer;