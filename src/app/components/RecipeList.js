import React from "react";

const RecipeList = ({ recipes }) => {
  return (
    <div className="mt-8 items-center text-center">
      <p className="text-yellow-400 text-xl">Recipe List</p>
      <ul>
        {recipes.map((recipe) => {
          return (
            <li className="text-white" key={recipe.id}>
              {recipe.recipeTitle}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecipeList;
