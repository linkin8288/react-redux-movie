// This component is responsible for rendering a dropdown select element for choosing a genre

// onChange Event Handler: When the user selects a genre from the dropdown, this event handler 
// is triggered. It dispatches the fetchDataByGenre action with the selected genre and content 
// type (type) as parameters.

// genres: The array of genres, likely fetched from an API or Redux store.
// genre: The value of the selected option (genre) from the <select>.
// type: The type of content (e.g., "movie").

// {genres.map((genre) => { ... })}: This code maps over the genres array and renders 
// an <option> element for each genre. Each option has a value attribute set to the 
// genre's id, and its displayed text is the genre's name.

import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";

export default function SelectGenre({ genres, type }) {

  const dispatch = useDispatch();

  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {/* This is the dropdown menu for chossing which genre do you like */}
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;