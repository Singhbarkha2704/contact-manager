import React from "react";
import user from "../images/user.jpeg";
import { Link, useParams } from "react-router-dom";

const ContactDetail = (props) => {
  const paramId = useParams();
  //   const { state } = useLocation();
  const detail = props.contacts.filter((contact) => contact.id === paramId.id);
  console.log(detail);
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{detail[0]?.name}</div>
          <div className="description">{detail[0]?.email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contacts List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
