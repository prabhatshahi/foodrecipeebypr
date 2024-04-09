import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingEffect from "../components/LoadingEffect";

const ItemSummary = () => {
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const { name } = useParams();

  const fetchRecipeDetails = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${name}/information?apiKey=9fee09a8462b4824aa3a1c85721f9349`
      );

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again Later.");
      }

      const fetchedRecipe = await response.json();
      setRecipe(fetchedRecipe);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [name]);

  const renderIngredients = () =>
    recipe.extendedIngredients?.map((ingredient, index) => (
      <li key={index}>{ingredient.original}</li>
    ));

  const errorStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const recipeCollectionStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "start",
    gap: "20px",
    overflow: "hidden",
    marginTop: "100px",
  };

  const recipeImageStyle = {
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    borderRadius: "10px",
    transition: "0.3s",
    margin: "10px",
  };

  const imageStyle = {
    width: "350px",
    height: "auto",
    borderRadius: "15px",
    overflow: "hidden",
    margin: "20px",
  };

  const descriptionStyle = {
    width: "350px",
    padding: "20px",
    lineHeight: "35px",
  };

  const titleStyle = {
    margin: "10px 0",
  };

  const headingStyle = {
    textAlign: "center",
    fontWeight: "bold",
    textDecoration: "none",
    margin: "35px",
  };

  const summaryStyle = {
    width: "60%",
    lineHeight: "50px",
    margin: "20px auto",
    color: "rgb(0, 0, 0)",
    fontWeight: "bold",
  };

  return (
    <>
      {isLoading && <LoadingEffect />}
      {fetchError && <h2 style={errorStyle}>{fetchError}</h2>}
      {!isLoading && !fetchError && recipe && (
        <div>
          <div style={recipeCollectionStyle}>
            <div style={recipeImageStyle}>
              <img src={recipe.image} alt={recipe.title} style={imageStyle} />
            </div>
            <div style={descriptionStyle}>
              <h1 style={titleStyle}>{recipe.title}</h1>
              {recipe.extendedIngredients && (
                <>
                  <h3>Description</h3>
                  <ul>{renderIngredients()}</ul>
                </>
              )}
              <p>{recipe.instructions}</p>
            </div>
          </div>
          <h2 style={headingStyle}>Summary</h2>
          <p style={summaryStyle}>{recipe.summary}</p>
        </div>
      )}
    </>
  );
};

export default ItemSummary;
