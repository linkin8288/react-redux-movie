import React from 'react'
import Login from './pages/Login';
import Netflix from './pages/Netflix';
import Signup from './pages/Signup';
import Player from './pages/Player';
import MoviePage from './pages/Movies';
import TVShows from "./pages/TVShows";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/movies" element={<MoviePage />} />
        <Route exact path="/new" element={<Player />} />
        <Route exact path="/" element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  )
}
