// By using Redux Toolkit, you're running a kitchen (state management system) 
// that can handle a variety of customer orders (actions) and maintain the quality 
// and consistency of your dishes (state).

// Your restaurant has a head chef (the root reducer) who oversees the entire kitchen, 
// and you have specialized chefs (sub-reducers) responsible for cooking specific types of dishes.

// install Redux Toolkit
// import createSlice
// create initialState
// Initiate the createSlice function with initialSstate, 
// The extraReducers field allows you to define additional reducer logic

// configureStore: This function is provided by Redux Toolkit and is used to create a Redux store. 
// reducer function that will handle state changes in response to actions. 

import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

// Get Genres function
// This thunk is responsible for fetching movie genres from an API and returning the fetched data
// createAsyncThunk is a function provided by Redux Toolkit that helps you create thunks for 
// handling asynchronous actions. It takes two arguments: 
// the first is a string that represents the action type, 
// and the second is an asynchronous function that will be executed when the action is dispatched.
export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
    // await axios.get is an asynchronous operation that is used to make an HTTP GET request 
  } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  // console.log(genres) to check whetehr if genres return
  return genres;
});

// this function processes each movie in the provided array. 
// It extracts genre names based on genre IDs.
// It creates formatted movie objects with essential details.
// It adds these processed movie objects to the moviesArray, 
// which can then be used to display movies with their genres and images.
const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

// this function fetches movie data from a given API endpoint and processes it to create an array of movie objects.
const getRawData = async (api, genres, paging = false) => {
  // Initializes an empty array to store the processed movie data.
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
      // The response is destructured to extract the results property from the data object. 
      // If paging is true, it includes the current page number in the request URL.
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

// Get movie my genre
export const fetchDataByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      genres
    );
  }
);

// Get movies function
// The first argument is a string that represents the action type prefix. 
// The second argument is an asynchronous function
export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    // extracting the genres property from type
    const {
      netflix: { genres },
      // this function is used to access the current state of the Redux store
    } = thunkAPI.getState();
    // it returns a Promise that resolves to the fetched data.
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:5000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

// Netflix
//  the state parameter represents the current state of the application, 
// and the action parameter represents the action being dispatched.
const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    //  It's setting up a case to handle the fulfilled action dispatched by the getGenres async thunk.
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

// configureStore: This function is provided by Redux Toolkit and is used to create a Redux store. 
// reducer function that will handle state changes in response to actions. 
// Once you have configured your Redux store with the NetflixSlice.reducer under the netflix key, 
// you can use the netflix key to access the state managed by the NetflixSlice reducer from any 
// component in your application.
export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});

export const { setGenres, setMovies } = NetflixSlice.actions;