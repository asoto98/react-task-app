import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd, name }) => {
  const location = useLocation();
  return (
    <header className='header'>
      <h1>Welcome {name}!</h1>
      <div>
        <h2>{title}</h2>
        {location.pathname === "/" && (
          <span>
            <Button
              color={showAdd ? "red" : "green"}
              text={showAdd ? "Close" : "Add"}
              onClick={onAdd}
            />
          </span>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: "Your Tasks:",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
