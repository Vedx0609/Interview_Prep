// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import ClerkAuth from "./components/Authentication/ClerkAuth.jsx";
import AuthPage from "./components/Authentication/AuthPage.jsx";
import Navbar from "./components/Layouts/Navbar.jsx";
import GenerationPage from "./components/Pages/GenerationPage.jsx";
import "./App.css";

function App() {
  return (
    <ClerkAuth>
      <ThemeProvider>
        <Routes>
          <Route path="/sign-in/*" element={<AuthPage />} />
          <Route path="/sign-up/*" element={<AuthPage />} />
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<GenerationPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ClerkAuth>
  );
}

export default App;
