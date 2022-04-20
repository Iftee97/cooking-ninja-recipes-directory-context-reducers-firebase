import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom"; // for redirects
import { projectFirestore } from "../../firebase/config";
import "./Create.css";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      title,
      method,
      ingredients,
      cookingTime: cookingTime + " minutes",
    };

    setIsPending(true);

    try {
      await projectFirestore.collection("recipes").add(recipe);
      history.push("/"); // redirects to the home page
    } catch (err) {
      console.log(err.message);
    }

    // fetch(" http://localhost:8000/recipes", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(recipe),
    // }).then(() => {
    //   console.log("new recipe added");
    //   setIsPending(false);
    //   history.push("/"); // redirects to the home page
    // });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    // // if there is an ingredient, and that ingredient is not included in the ingredients array:
    // // then we add it to the ingredinets array
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a new recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        {/* ingredients field */}
        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </label>

        {/* <button type="submit" className="btn">
          Submit
        </button> */}
        {!isPending && <button className="btn">Submit</button>}
        {isPending && (
          <button className="btn" disabled>
            Adding...
          </button>
        )}
      </form>
    </div>
  );
}

export default Create;
