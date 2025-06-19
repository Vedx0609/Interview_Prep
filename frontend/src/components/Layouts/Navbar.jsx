import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { defaultTheme, dark } from "@clerk/themes";
import { Outlet, Link, Navigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  const authTheme = isDarkMode ? dark : defaultTheme;

  // Apply dark mode to the entire document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="navbar-layout">
      <header className="navbar-header">
        <div className="navbar-content">
          <h2 className="navbar-title">Interview Preparation Helper</h2>
          <nav className="navbar-nav">
            <SignedIn appearance={{ baseTheme: authTheme }}>
              <Link to="/" className="nav-link">
                Generate Interview Question
              </Link>
              <Link to="/history" className="nav-link">
                History
              </Link>

              <button
                onClick={toggleDarkMode}
                className="dark-mode-toggle"
                data-tooltip={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <UserButton appearance={{baseTheme: authTheme}}/>
            </SignedIn>
          </nav>
        </div>
      </header>

      <main className="navbar-main">
        <SignedIn appearance={{ baseTheme: authTheme }}>
          <Outlet />
        </SignedIn>
        <SignedOut appearance={{ baseTheme: authTheme }}>
          <Navigate to="/sign-in" replace />
        </SignedOut>
      </main>
    </div>
  );
}
