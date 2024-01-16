"use client";
import React, { useEffect, useState } from "react";
import RecipeForm from "./RecipeForm";
import RecipeList from "./RecipeList";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };
  return (
    <div>
      <RecipeForm addRecipe={addRecipe} />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Recipes;
