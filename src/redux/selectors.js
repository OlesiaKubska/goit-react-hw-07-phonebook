import { createSelector } from "@reduxjs/toolkit";

export const selectAllContacts = (state) => state.contacts.contacts;
export const selectFilter = (state) => state.filter;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectAllContacts, selectFilter],
    (contacts, filter) => {
        if (!Array.isArray(contacts) || !filter) return [];
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }
);