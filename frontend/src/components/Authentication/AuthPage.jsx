import { SignIn, SignedIn, SignUp, SignedOut } from "@clerk/clerk-react";
import { defaultTheme, dark} from "@clerk/themes";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeContext";
import "./AuthPage.css";

export default function AuthPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
    
    const authTheme = isDarkMode ? dark : defaultTheme;

  return (
    <div className="auth-page">
      <header className="navbar-header">
        <div className="navbar-content">
          <h2 className="navbar-title">Interview Preparation Helper</h2>
          <nav className="navbar-nav">
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              data-tooltip={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>
        </div>
      </header>
      <div className="auth-container">
        <SignedOut appearance={{ baseTheme: authTheme }}>
          <SignIn 
          appearance={{ baseTheme: authTheme }}
          path="/sign-in"
          routing="path" />
          <SignUp path="/sign-up" routing="path" />
        </SignedOut>
        <SignedIn appearance={{ baseTheme: authTheme }}>
          <div className="welcome-message">
            <h2>Welcome back!</h2>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
