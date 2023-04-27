import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";
// import { useFetch } from "../../hooks/useFetch";
import "./Recipe.css";

function Recipe() {
  const { mode } = useTheme();

  const { id } = useParams();
  // const url = `http://localhost:8000/recipes/${id}`;
  // const { data: recipe, isPending, error } = useFetch(url);

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    // get snapshot of a single document by id from the recipes collection
    const unsubscribe = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        // console.log(doc);
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("could not find that recipe");
        }
      });

    return () => {
      unsubscribe();
    };
  }, [id]);

  // const handleClick = () => {
  //   projectFirestore.collection("recipes").doc(id).update({
  //     title: "something completely different",
  //   });
  // };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} minutes to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          {/* <button onClick={handleClick}>update recipe</button> */}
        </>
      )}
    </div>
  );
}

export default Recipe;
