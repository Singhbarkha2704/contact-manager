import axios from "axios";
import { v4 as uuid } from "uuid";

export const API_URL = axios.create({
  baseURL: "http://localhost:3000/",
});

export const CONTACTS_ENDPOINT = "/contacts";

//Retrieve Contacts - GET METHOD
export const retrieveContacts = async () => {
  const response = await API_URL.get(CONTACTS_ENDPOINT);
  return response.data;
};

export const retrieveSingleContact = async (id) => {
  const response = await API_URL.get(`${CONTACTS_ENDPOINT}/${id}`);
  return response.data;
};

//create contact - POST METHOD
export const createContact = async (contact) => {
  const request = {
    id: uuid(),
    ...contact,
  };
  const response = API_URL.post(CONTACTS_ENDPOINT, request);
  console.log(`response`, response);
  return response.data;
};

//Delete Contacts - DELETE METHOD
export const deleteContact = async (id) => {
  return await API_URL.delete(`${CONTACTS_ENDPOINT}/${id}`);
};

//Edit Contact - PUT METHOD
export const editContact = async (id, contact) => {
  return await API_URL.put(`${CONTACTS_ENDPOINT}/${id}`, contact);
};
