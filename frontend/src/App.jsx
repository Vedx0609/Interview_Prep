// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import ClerkAuth from "./components/Authentication/ClerkAuth.jsx";
import AuthPage from "./components/Authentication/AuthPage.jsx";
import Navbar from "./components/Layouts/Navbar.jsx";
import "./App.css";

function App() {
  return (
    <ClerkAuth>
      <Routes>
        <Route path="/sign-in/*" element={<AuthPage />} />
        <Route path="/sign-up/*" element={<AuthPage />} />
        <Route path="/" element={<Navbar />}>
          <Route
            index
            element={<h1>Welcome to the Interview Preparation Helper</h1>}
          />
          <Route path="history" element={<h1>History Page</h1>} />
          <Route
            path="generate"
            element={<h1>Generate Interview Question Page</h1>}
          />
        </Route>
      </Routes>
    </ClerkAuth>
  );
}

export default App;
