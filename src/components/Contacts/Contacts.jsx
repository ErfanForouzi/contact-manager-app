import Contact from "./Contact";
import Spinner from "../Spinner";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
  const {deleteContact,loading,filteredContacts} = useContext(ContactContext)
  return (
    <>
      <section className="container">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link to='/contacts/add' className="btn mx-2 my-3" style={{ backgroundColor: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
      </section>
      {loading ? <Spinner /> : (
        <section className="container">
          <div className="row">
            {filteredContacts.length > 0
              ? filteredContacts.map((c) => <Contact deleteContact={deleteContact} key={c.id} contact={c} />)
              : (
                <div
                  className="text-center py-5 mt-4"
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className="h3" style={{ color: ORANGE }}>
                    مخاطب یافت نشد ...
                  </p>
                  <img
                    src={require("../../assets/no-found.gif")}
                    alt="پیدا نشد"
                    className="w-25"
                  />
                </div>
              )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
