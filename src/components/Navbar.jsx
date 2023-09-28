import SearchContact from "./Contacts/SearchContact";
import { useLocation } from "react-router-dom";
import { BACKGROUND, PURPLE } from "../helpers/colors";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col-xs-12 col-sm-12 col-md-6">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: PURPLE }} /> وب
              اپلیکیشن مدیریت{"  "}
              <span style={{ color: PURPLE }}>مخاطبین</span>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6">
            {location.pathname === "/contacts" && <SearchContact />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
