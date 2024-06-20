import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  const inputElem = useRef("");
  const deleteContactCard = (id) => {
    props.removeContactHandler(id);
  };

  //contactCard
  const renderContactCard = props.contacts.map((contact) => {
    console.log(contact);
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={deleteContactCard}
      />
    );
  });

  //Fn to send currentValue(prop) to parent while typing on search Bar
  const getSearchTerm = () => {
    // console.log(`inputEl`, inputElem.current.value);
    props.searchKeyword(inputElem.current.value);
  };
  return (
    <div className="main width-form">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Contacts</h2>

        {/* Link for Add Contact Form */}
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            ref={inputElem}
            onChange={getSearchTerm}
          />
          <i className="search icon" />
        </div>
      </div>

      {/* render all contacts or searched contacts*/}
      <div className="ui celled list">
        {renderContactCard.length ? renderContactCard : <h3>No Contacts</h3>}
      </div>
    </div>
  );
};

export default ContactList;
