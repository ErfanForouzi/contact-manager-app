import { createContext } from "react";
export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contacts: [],
  setContacts: () => {},
  filteredContacts: [],
  setFilteredContacts: () => {},
  groups: [],
  setGroups:()=>{},
  deleteContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
