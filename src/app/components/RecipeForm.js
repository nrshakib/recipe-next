"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RecipeForm = ({ addRecipe }) => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  // const [mediaUrl, setMediaUrl] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch Instruction Data
  useEffect(() => {
    fetch("http://localhost:8000/ingredients")
      .then((res) => res.json())
      .then((ingredients) => setAllIngredients(ingredients));
  }, []);

  const handleTitleChange = (e) => {
    setRecipeTitle(e.target.value);
  };

  const handleIngredientChange = (e) => {
    const selectedIngredient = e.target.value;
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      selectedIngredient,
    ]);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  //  const handleMediaUrlChange = (e) => {
  //  setMediaUrl(e.target.value);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const newErrors = {};
    if (!recipeTitle.trim()) {
      newErrors.title = "Title is required";
    }
    if (selectedIngredients.length === 0) {
      newErrors.ingredients = "Select at least one ingredient";
    }
    if (!instructions.trim()) {
      newErrors.instructions = "Instructions are required";
    }

    const newRecipe = {
      id: uuidv4(),
      recipeTitle: recipeTitle,
      selectedIngredients: selectedIngredients,
      instructions: instructions,
    };
    addRecipe(newRecipe);

    setErrors(newErrors);
    setRecipeTitle("");
    setSelectedIngredients([]);
    setInstructions("");

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, handle the submission (e.g., save to a database)
      console.log("Recipe Title:", recipeTitle);
      console.log("Selected Ingredients:", selectedIngredients);
      console.log("Instructions:", instructions);
      // console.log("Media URL:", mediaUrl);
    }
  };
  return (
    <div>
      <form className="mt-4" onSubmit={handleSubmit}>
        <label className="flex">
          <p>Recipe Title:</p>
          <input
            className="h-8 w-64 ml-4 rounded-sm text-black"
            type="text"
            value={recipeTitle}
            onChange={handleTitleChange}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </label>
        <br />
        <label className="flex">
          <p>Ingredients:</p>
          <select
            className="h-8 w-64 ml-5 rounded-sm text-black"
            multiple
            value={selectedIngredients}
            onChange={handleIngredientChange}
          >
            {allIngredients.map((ingredient) => (
              <option
                className="border border-black h-8 text-center pt-1"
                key={ingredient.id}
              >
                {ingredient.label}
              </option>
            ))}
            {/* {console.log(allIngredients)} */}
          </select>
          {errors.ingredients && (
            <p style={{ color: "red" }}>{errors.ingredients}</p>
          )}
        </label>
        <br />
        <label className="flex">
          <p>Instructions:</p>
          <textarea
            className="h-8 w-64 ml-4 rounded-sm text-black"
            value={instructions}
            onChange={handleInstructionsChange}
          />
          {errors.instructions && (
            <p style={{ color: "red" }}>{errors.instructions}</p>
          )}
        </label>
        {/* <label>
          Media URL (optional):
          <input type="text" value={mediaUrl} onChange={handleMediaUrlChange} />
        </label> */}
        <br />
        <button
          className="w-64 h-8 bg-yellow-500 rounded-md text-black"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
