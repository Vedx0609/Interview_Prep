import React from "react";
import { SignIn, SignedIn, SignUp, SignedOut } from "@clerk/clerk-react";

export default function AuthPage() {
  return (
    <div className="auth-page">
      <SignedOut>
        <SignIn path="/sign-in" routing="path" />
        <SignUp path="/sign-up" routing="path" />
      </SignedOut>
      <SignedIn>
        <div className="welcome-message">
          <h2>Welcome back!</h2>
        </div>
      </SignedIn>
    </div>
  );
}
