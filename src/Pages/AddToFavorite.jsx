import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteFromFav } from "../AddingToFav";

const AddToFavorite = () => {
  const bookmarkedItems = useSelector(
    (state) => state.savedItems.bookmarkedItems
  );
  const dispatch = useDispatch();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleRemoveItem = (item) => {
    dispatch(deleteFromFav(item));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "20px 10%",
        margin: "100px auto",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "30px",
      }}
    >
      {bookmarkedItems.length === 0 ? (
        <h1>Nothing in your favorites. Please Add Items </h1>
      ) : (
        bookmarkedItems.map((item) => (
          <div
            key={item.id}
            style={{
              width: "230px",
              height: "auto",
              padding: "5px",
              borderRadius: "10px",
              backgroundColor: "white",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow:
                hoveredItem === item.id
                  ? "rgba(0, 0, 0, 0.35) 0px 5px 20px"
                  : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              transform: hoveredItem === item.id ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavLink
              to={`/recipe/${item.id}`}
              style={{
                textDecoration: "none",
                color: "rgb(0, 0, 0)",
              }}
            >
              <div>
                <img
                  src={item.image}
                  alt={item.title.slice(0, 10)}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
              <h4
                style={{
                  margin: "6px 0",
                  textDecoration: "none",
                }}
              >
                {item.title.slice(0, 18)}...
              </h4>
            </NavLink>
            <button
              style={{
                padding: "7px",
                backgroundColor: "rgba(128, 128, 128, 0.589)",
                textAlign: "center",
                border: "none",
                fontWeight: "900",
                marginTop: "10px",
                marginBottom: "5px",
                width: "100%",
                fontSize: "16px",
                borderRadius: "20px",
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => handleRemoveItem(item)}
            >
              Delete From Favorite
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AddToFavorite;
