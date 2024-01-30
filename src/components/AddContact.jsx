import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  return (
    <div className="ui main width-form">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="ui field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
