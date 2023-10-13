import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Section } from "./Section/Section";
import { Header } from "./Header/Header";
import { AppContainer } from "./AppContainer/AppContainer";
import { setFilter } from "redux/filterSlice";
import { fetchContacts } from "redux/operations";
import { selectError, selectFilter, selectIsLoading, selectAllContacts } from "redux/selectors";

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectAllContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <AppContainer>
      <Section title="Phone Book">
        <ContactForm />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {contacts && contacts.length === 0 && !isLoading &&
          <p>There are no any contacts ...</p>}
        <Header title="Contacts" />
        <Filter
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          />
        <ContactList />
      </Section>
    </AppContainer>
  );
};