import { useEffect, useState, useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { getContact, getGroup } from "../../services/contactService";
import { useParams, Link } from "react-router-dom";
import Spinner from "../Spinner";
import { CYAN, PURPLE, CURRENTLINE } from "../../helpers/colors";
const ViewContact = () => {
  const { loading, setLoading } = useContext(ContactContext);
  const [state, setState] = useState({
    group: {},
    contact: {},
  });
  const { contactId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        setLoading(false);
        setState({
          ...state,
          group: groupData,
          contact: contactData,
        });
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { contact, group } = state;

  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact">
              <div className="container">
              <hr style={{ backgroundColor: CYAN }} />
              </div>

              <div
                className="container p-2 overflow-hidden"
                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
              >
                <section className="row d-flex justify-content-center align-items-center">
                  <div className="col-xs-12 col-sm-12 col-md-4">
                    <img
                      src={contact.photo}
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${PURPLE}` }}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-8  mt-2">
                    <ul className="list-group p-0">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل : <span className="fw-bold">{contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        گروه : <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </section>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
