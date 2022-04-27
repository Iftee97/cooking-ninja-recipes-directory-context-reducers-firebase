import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
    const [term, setTerm] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        history.push(`/search?q=${term}`); // redirect to search page with the query term
        setTerm("");
    };

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    placeholder="search recipes"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    required
                />
            </form>
        </div>
    );
}

export default SearchBar;
