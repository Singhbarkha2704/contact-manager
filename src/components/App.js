import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import {
  createContact,
  deleteContact,
  retrieveContacts,
} from "../api/contacts";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Create Contact
  const addContactHandler = async (contact) => {
    console.log(contact);
    const newContact = await createContact(contact);
    console.log(newContact);
    if (newContact) setContacts([...contacts, newContact]);
  };

  //Delete Contact
  const removeContactHandler = async (id) => {
    // const newContacts = contacts.filter((contact) => contact.id !== id);
    await deleteContact(id);
    const allContacts = await retrieveContacts();
    setContacts(allContacts);
  };

  useEffect(() => {
    // const retrievedContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retrievedContacts) setContacts(retrievedContacts);

    //fetch All Contacts
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  //executes on typing on search Bar
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const searchedContacts = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      console.log(``, searchedContacts);
      setSearchResults(searchedContacts);
    } else {
      setSearchResults(contacts);
    }
  };
  return (
    <div className="App main">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                removeContactHandler={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/edit/:id"
            element={
              <AddContact contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contact/:id"
            element={<ContactDetail contacts={contacts} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
