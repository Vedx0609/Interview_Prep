// import { useState } from 'react'
import ClerkAuth from "./components/ClerkAuth.jsx";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage.jsx";
import "./App.css";

function App() {
  return (
    <ClerkAuth>
      <Routes>
        <Route path="/sign-in/*" element={<AuthPage/>} />
        <Route path="/sign-up/*" element={<AuthPage/>} />
      </Routes>
    </ClerkAuth>
  );
}

export default App;
