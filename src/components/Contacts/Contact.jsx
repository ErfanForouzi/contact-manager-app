import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from "../../helpers/colors";
import { Link } from "react-router-dom";
const Contact = ({ contact, deleteContact }) => {
  return (
    <section className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-between">
            <div className="col-xs-12 col-sm-4 col-md-12 col-lg-4 mx-auto">
              <img
                src={contact.photo}
                alt={contact.fullname}
                style={{ border: `1px solid ${PURPLE}`,width:"200px" }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-xs-12 col-sm-7 col-md-12 col-lg-7  my-2">
              <ul className="list-group p-0">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوداگی :{"  "}
                  <span className="fw-bold">{contact.fullname}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{"  "}
                  <span className="fw-bold">{contact.mobile}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل :{"  "}
                  <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-1 col-md-12 col-lg-1  d-flex flex-column align-items-center">
              <Link
                to={`/contacts/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye" />
              </Link>

              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: CYAN,color:"black",fontWeight:"bold" }}
              >
                <i className="fa fa-edit fa-lg" />
              </Link>
              <button
                onClick={() => deleteContact(contact.id, contact.fullname)}
                className="btn my-1"
                style={{ backgroundColor: RED }}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
