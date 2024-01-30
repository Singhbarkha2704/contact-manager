import axios from "axios";

const createAxios = axios.create({
  baseURL: "http://localhost:3006/",
});

//Retrieve Contacts
const retrieveContacts = async () => {
  const response = await createAxios.get("/contacts");
  return response.data;
};
