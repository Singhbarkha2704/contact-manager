import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  const deleteContactCard = (id) => {
    props.removeContactHandler(id);
  };
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

  return (
    <div className="main width-form">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Contacts</h2>
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </div>
      <div className="ui celled list">{renderContactCard}</div>
    </div>
  );
};

export default ContactList;
