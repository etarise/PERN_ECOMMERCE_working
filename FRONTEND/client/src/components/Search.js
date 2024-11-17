import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  return (
    <div className="search">
      <input
        type="search"
        className="form-control"
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        placeholder="What are you looking for?"
      />
      <button type="button" className="btn btn-primary">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default Search;
