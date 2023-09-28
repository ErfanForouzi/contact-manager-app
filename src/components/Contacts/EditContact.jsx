import { useEffect, useState, useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import {
  getContact,
  updateContact,
} from "../../services/contactService";
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { PURPLE, COMMENT, ORANGE } from "../../helpers/colors";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactSchema } from "../../validation/contactValidation";
import {toast} from "react-toastify"
const EditContact = () => {
  const {
    loading,
    setLoading,
    groups,
    contacts,
    setContacts,
    setFilteredContacts,
  } = useContext(ContactContext);
  const [contact, setContact] = useState({});

  const { contactId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setLoading(false);
        setContact(contactData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitForm = async (values) => {
    const allContacts = [...contacts];
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);
      setLoading(false);
      if (status === 200) {
        toast.info("کاربر با موفقیت تغییر کرد" ,{icon:"✅"})
        const updatedContacts = allContacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allContacts[updatedContacts] = { ...data };
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setLoading(false);
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-100 mx-auto d-flex flex-xs-column"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-xs-12 col-sm-12 col-md-8">
                  <Formik
                    initialValues={{
                      fullname: contact.fullname,
                      job: contact.job,
                      photo: contact.photo,
                      group: contact.group,
                      email: contact.email,
                      mobile: contact.mobile,
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                        />
                        <ErrorMessage name="fullname" render={(msg)=>(
                          <div className="text-danger">{msg}</div>
                        )}/>
                      </div>
                      <div className="mb-2">
                        <Field
                          name="photo"
                          type="text"
                          className="form-control"
                          placeholder="آدرس تصویر"
                        />
                         <ErrorMessage name="photo" render={(msg)=>(
                          <div className="text-danger">{msg}</div>
                        )}/>
                      </div>
                      <div className="mb-2">
                        <Field
                          name="mobile"
                          type="number"
                          className="form-control"
                          placeholder="شماره موبایل"
                        />
                        <ErrorMessage name="mobile" render={(msg)=>(
                          <div className="text-danger">{msg}</div>
                        )}/>
                      </div>
                      <div className="mb-2">
                        <Field
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="آدرس ایمیل"
                        />
                          <ErrorMessage name="email" render={(msg)=>(
                          <div className="text-danger">{msg}</div>
                        )}/>
                      </div>
                      <div className="mb-2">
                        <Field
                          name="job"
                          type="text"
                          className="form-control"
                          placeholder="شغل"
                        />
                          <ErrorMessage name="job" render={(msg)=>(
                          <div className="text-danger">{msg}</div>
                        )}/>
                      </div>
                      <div className="mb-2">
                        <Field
                        as="select"
                          name="group"
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage name="group" render={(msg)=>(
                          <div className="text-danger">{msg}</div>
                        )}/>
                      </div>
                      <div className="mb-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="ویرایش مخاطب"
                        />
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          انصراف
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

           
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
