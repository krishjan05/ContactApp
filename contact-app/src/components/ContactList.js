import React, {useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, getContactId, term, searchKeyword }) => {
  const inputElement = useRef("");

  const deleteContactHandler = (id) => {
    getContactId(id);
  };

  const renderContactList = contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key="{contact.id}"
        clickHandler={deleteContactHandler}
      />
    );
  });

  const getSearchTerm = () => {
    searchKeyword(inputElement.current.value);
  }

  return (
    <div className="main">
      <h2>Contact List</h2>
      <Link to="/add">
        <button className="ui button blue right">Add Contact</button>
      </Link>
      <div className="ui search">
      <div className="ui icon input">
      <input 
        ref={inputElement}
        type="text" 
        placeholder="Search Contacts" 
        className="prompt" 
        value={term} 
        onChange={getSearchTerm}
      />  
      <i className="search icon" ></i>
    </div>
      </div>
      <div className="ui celled List">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
