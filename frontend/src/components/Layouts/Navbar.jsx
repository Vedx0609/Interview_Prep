import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { defaultTheme, dark } from "@clerk/themes";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const authTheme = isDarkMode ? dark : defaultTheme;

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