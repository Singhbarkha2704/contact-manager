import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editContact,
  retrieveContacts,
  retrieveSingleContact,
} from "../api/contacts";

const AddContact = (props) => {
  const navigate = useNavigate();
  const paramId = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  console.log(paramId);

  // (async (param) => {
  //   const res = await retrieveSingleContact(param);
  //   console.log(res);
  //   setEditName(res.name);
  //   setEditEmail(res.email);
  //   console.log(editEmail, editName);
  // })(paramId.id);

  useEffect(() => {
    const fetchData = async () => {
      if (paramId.id) {
        const res = await retrieveSingleContact(paramId.id);
        setEditName(res.name);
        setEditEmail(res.email);
      }
    };

    fetchData();
  }, [paramId.id]);

  //fn to add contact - send prop to parent i.e. obj of contact
  const add = (event) => {
    event.preventDefault();
    if (name === "" && email === "") {
      alert("*All Fields are mandatory!");
      return;
    }
    console.log(name, email);
    //passing the state to its perent using fn
    props.addContactHandler({ name, email });

    //clear the input field
    setName("");
    setEmail("");
    navigate("/");
  };

  //on change of name
  const handleNameChange = (event) => {
    !paramId?.id
      ? setName(event.target.value)
      : setEditName(event.target.value);
  };

  //on change of Email
  const handleEmailChange = (event) => {
    !paramId?.id
      ? setEmail(event.target.value)
      : setEditEmail(event.target.value);
  };

  // console.log(`singleCont`, singleCont);

  //on Edit Button Click
  const updateHandler = async (event) => {
    event.preventDefault();
    const res = await editContact(paramId.id, {
      name: editName,
      email: editEmail,
    });
    console.log(res.data);

    const all = await retrieveContacts();
    console.log(`all`, all);
    if (res) {
      const updatedContacts = props.contacts.map((elem) =>
        elem.id === paramId.id ? { ...res.data } : elem
      );
      props.setContacts(updatedContacts);
    }
    console.log(`contacts`, props.contacts);
    navigate("/");
  };

  return (
    <div className="ui main width-form">
      {!paramId.id ? <h2>Add Contact</h2> : <h2>Edit Contact</h2>}

      {/* edit/create form */}
      <form className="ui form" onSubmit={!paramId.id ? add : updateHandler}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={paramId.id ? editName : name}
            onChange={handleNameChange}
          />
        </div>
        <div className="ui field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={paramId.id ? editEmail : email}
            onChange={handleEmailChange}
          />
        </div>

        {/* Add or Edit Button */}
        {!paramId.id ? (
          <button className="ui button blue">Add</button>
        ) : (
          <button className="ui button blue">Edit</button>
        )}
      </form>
    </div>
  );
};

export default AddContact;
