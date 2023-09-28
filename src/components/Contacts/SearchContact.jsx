import { PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
const SearchContact = () => {
  const {  contactSearch } = useContext(ContactContext);
  return (
    <div className="input-group mx-auto w-100" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i className="fas fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
        onChange={(e) => contactSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchContact;
