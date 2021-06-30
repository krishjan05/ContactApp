import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";

import "./App.css";
import api from "../api/contacts";

import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {   
    const getAllContacts = async () => {
      const retrivedContacts = await retriveContacts();
      if (retrivedContacts) setContacts([...retrivedContacts]);
    }

    getAllContacts();
  }, []);

  useEffect(() => {
  }, [contacts]);

  // Retrive contact
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const request = {
      ...contact
    };
    const response = await api.put(`/contacts/${contact.id}`, request);
    const {id, name, email} = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data}: contact
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if(searchTerm !== ""){
    const searchedContacts = contacts.filter((contact) => {
      return Object.values(contact).join(" ").toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    });
    setSearchResult(searchedContacts)
  }else
    setContacts(contacts);
  }

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/contact/:id"
            render={(props) => <ContactDetail {...props} />}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
