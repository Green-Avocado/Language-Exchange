import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landing/LandingPage";
import { SearchPage } from "./pages/search/SearchPage";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='search' element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
