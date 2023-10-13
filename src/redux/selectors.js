import { createSelector } from "@reduxjs/toolkit";

export const selectAllContacts = ({ contacts }) => contacts.items;
export const selectFilter = ({ filter }) => filter;
export const selectIsLoading = ({ contacts }) => contacts.isLoading;
export const selectError = ({ contacts }) => contacts.error;

export const selectFilteredContacts = createSelector(
    [selectAllContacts, selectFilter],
    (contacts, filter) => {
        if (!filter) {
            return contacts;
        }
        const normalizedFilter = filter.toLowerCase();
        const filteredContacts = contacts.filter(
            ({ name, phone }) =>
                name.toLowerCase().trim().includes(normalizedFilter) ||
                phone.trim().includes(normalizedFilter)
        );
        return filteredContacts;
    }
);