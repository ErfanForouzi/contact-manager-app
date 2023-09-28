import axios from "axios";
const SERVER_URL = "http://localhost:9000";


//GET getAllContacts request
//Route http://localhost:9000/contacts
export const getAllContacts = ()=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url)
}
//GET getContact request
//Route http://localhost:9000/contacts/contactId
export const getContact = (contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url)
}
//GET getAllGroups request
//Route http://localhost:9000/groups
export const getAllGroups = ()=>{
    const url = `${SERVER_URL}/groups`;
    return axios.get(url)
}
//GET getGroup request
//Route http://localhost:9000/groups
export const getGroup = (groupId)=>{
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url)
}
//POST getAllContacts request
//Route http://localhost:9000/contacts
export const createContact = (contact)=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url,contact)
}
//PUT singleContact request
//Route http://localhost:9000/contacts/contactId
export const updateContact = (contact,contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact)
}
//DELETE singleContact request
//Route http://localhost:9000/contacts/contactId
export const deleteContact = (contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url)
}