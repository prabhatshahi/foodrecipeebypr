import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { markAsFav } from "../AddingToFav";
import LoadingEffect from "../components/LoadingEffect";

const Find = () => {
  const [searchRecipe, setSearchRecipe] = useState([]);
  const searchItems = useSelector((state) => state.savedItems.bookmarkedItems);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { search } = useParams();

  useEffect(() => {
    const getSearch = async (name) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=9fee09a8462b4824aa3a1c85721f9349&query=${name}`
        );
        if (!response.ok)
          throw new Error("Something went wrong. Please Try again.");
        const { results } = await response.json();
        if (results.length === 0) throw new Error("No recipe found.");
        setSearchRecipe(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getSearch(search);
  }, [search]);

  const dispatch = useDispatch();

  const addToFavoriteBtnHandler = (recipe) => {
    dispatch(markAsFav(recipe));
  };

  const searchRecipeConStyle = {
    display: "flex",
    width: "100%",
    padding: "20px 10%",
    margin: "100px auto",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "30px",
  };

  const recipeCardStyle = {
    width: "230px",
    height: "auto",
    padding: "5px",
    borderRadius: "10px",
    backgroundColor: "white",
    transition: "0.3s",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  const recipeLinkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "20px",
  };

  const recipeTitleStyle = {
    margin: "7px 0",
  };

  const btnStyle = {
    padding: "7px",
    backgroundColor: "rgba(128, 128, 128, 0.589)",
    textAlign: "center",
    border: "none",
    fontWeight: "700",
    marginTop: "10px",
    marginBottom: "5px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "20px",
    cursor: "pointer",
  };

  return (
    <>
      {loading ? (
        <LoadingEffect />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div style={searchRecipeConStyle}>
          {searchRecipe.map((recipe) => (
            <div key={recipe.id} style={recipeCardStyle}>
              <NavLink to={`/recipe/${recipe.id}`} style={recipeLinkStyle}>
                <img
                  src={recipe.image}
                  alt={recipe.title.slice(0, 10)}
                  style={imageStyle}
                />
                <h4 style={recipeTitleStyle}>{`${recipe.title.slice(
                  0,
                  14
                )}...`}</h4>
              </NavLink>
              <button
                disabled={searchItems.some((item) => item.id === recipe.id)}
                style={btnStyle}
                onClick={() => addToFavoriteBtnHandler(recipe)}
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

export default Find;
