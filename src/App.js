import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import _ from "lodash";

import {
  AddContact,
  Contact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";
import { confirmAlert } from "react-confirm-alert";

import "./App.css";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getAllGroups,
} from "./services/contactService";
import {
  PURPLE,
  CURRENTLINE,
  FOREGROUND,
  YELLOW,
  COMMENT,
} from "./helpers/colors";
import { ContactContext } from "./context/contactContext";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const createContactForm = async (value) => {
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(value);
      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد",{icon:"😎"})
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (error) {
      setLoading((prevLoading) => !prevLoading);
    }
  };
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      const updatedContacts = allContacts.filter(
        (c) => c.id !== parseInt(contactId)
      );
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);
      const { status, data } = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت حذف شد" , {icon:"🤚"})
      console.log(data);
      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (error) {
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  const contactSearch = _.debounce((value) => {
    if (!value) return setFilteredContacts([...contacts]);
    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.fullname.toLowerCase().startsWith(value.toLowerCase());
      })
    );
  }, 1000);
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contacts,
        setContacts,
        filteredContacts,
        setFilteredContacts,
        contactSearch,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        groups,
        setGroups,
      }}
    >
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
