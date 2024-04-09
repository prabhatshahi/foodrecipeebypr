import React from "react";

const Footer = () => {
  const footerStyle = {
    width: "100vw",
    height: "60px",
    backgroundColor: "rgb(11, 11, 11)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "20px",
  };

  return <div style={footerStyle}>Made by Prabhat {/* Added the text */}</div>;
};

export default Footer;
