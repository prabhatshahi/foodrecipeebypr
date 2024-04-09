import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/Find/${searchTerm}`);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <input
          type="text"
          style={{
            width: "250px",
            marginTop: "100px",
            padding: "10px",
            borderRadius: "30px 0 0 30px",
            outline: "none",
            border: "none",
            fontSize: "15px",
            backgroundColor: "#ffff",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Meal ,recipe, ingredients, dish"
        />
        <button
          style={{
            borderRadius: "0 30px 30px 0",
            border: "2px solid black",
            outline: "2px",
            marginTop: "100px",
            cursor: "pointer",
            padding: "0 10px",
            backgroundColor: "black",
            fontWeight: "700",
            color: "rgb(255, 255, 255)",
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
