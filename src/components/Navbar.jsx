import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const bookmarkedItems = useSelector(
    (state) => state.savedItems.bookmarkedItems
  );

  const navConNewStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: "10px",
    position: "fixed",
    zIndex: "1000",
    top: "0",
    width: "100vw",
  };

  const navNewlinkStyle = {
    textDecoration: "none",
    color: "rgb(255, 255, 255)",
    fontSize: "22px",
    padding: "10px",
  };

  const isActive = (match, location) => match.isExact;

  return (
    <div style={navConNewStyle}>
      <NavLink to="/" style={navNewlinkStyle} isActive={isActive}>
        Home
      </NavLink>
      <NavLink to="/favorite" style={navNewlinkStyle} isActive={isActive}>
        Favorites
        {bookmarkedItems.length > 0 && (
          <span> ( {bookmarkedItems.length} )</span>
        )}
      </NavLink>
    </div>
  );
};

export default Navbar;
