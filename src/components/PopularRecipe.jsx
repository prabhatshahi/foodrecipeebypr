import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { markAsFav } from "../AddingToFav";
import LoadingEffect from "./LoadingEffect";

const PopularSection = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const bookmarkedItems = useSelector(
    (state) => state.savedItems.bookmarkedItems
  );

  useEffect(() => {
    const getPopularRecipes = async () => {
      setIsFetching(true);
      setFetchError(null);

      try {
        const cachedData = localStorage.getItem("popularDishes");
        let retrievedData;

        if (cachedData) {
          retrievedData = JSON.parse(cachedData);
        } else {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=9fee09a8462b4824aa3a1c85721f9349&number=20`
          );
          if (!response.ok) {
            throw new Error("An error occurred while fetching data.");
          }
          const data = await response.json();
          retrievedData = data.recipes;
          localStorage.setItem("popularDishes", JSON.stringify(retrievedData));
        }

        setFetchedData(retrievedData);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsFetching(false);
      }
    };

    getPopularRecipes();
  }, []);

  const dispatch = useDispatch();

  const handleAddToFavorite = (recipe) => {
    dispatch(markAsFav(recipe));
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      {isFetching && <LoadingEffect />}
      {fetchError && <h2>Error: {fetchError}</h2>}
      {!isFetching && !fetchError && fetchedData.length > 0 && (
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
          {fetchedData.map((recipe, index) => (
            <div
              key={recipe.id}
              style={{
                width: "230px",
                height: "auto",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "white",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                transform: index === hoveredIndex ? "scale(1.05)" : "scale(1)",
                zIndex: index === hoveredIndex ? 1 : "auto",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to={`/recipe/${recipe.id}`}
                style={{
                  textDecoration: "none",
                  color: "rgb(0, 0, 0)",
                }}
              >
                <div>
                  <img
                    src={recipe.image}
                    alt={recipe.title.slice(0, 10)}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <h4
                  style={{
                    margin: "7px 0",
                  }}
                >
                  {recipe.title.slice(0, 25)}...
                </h4>
              </NavLink>
              <button
                disabled={bookmarkedItems.some((item) => item.id === recipe.id)}
                style={{
                  padding: "7px",
                  backgroundColor: "rgba(128, 128, 128, 0.589)",
                  textAlign: "center",
                  border: "none",
                  fontWeight: "bold",
                  marginTop: "12px",
                  marginBottom: "3px",
                  width: "100%",
                  fontSize: "16px",
                  color: "rgb(0, 0, 0)",
                  borderRadius: "20px",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "rgba(128, 128, 128, 0.8)",
                  },
                }}
                onClick={() => handleAddToFavorite(recipe)}
              >
                Add To Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PopularSection;
