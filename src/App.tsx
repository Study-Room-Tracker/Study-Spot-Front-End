import "./App.css";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import MainLayout from "./layouts/main.layout";
import AboutPage from "./pages/about.page";
import ContactPage from "./pages/contact.page";
import ProfilePage from "./pages/profile.page";
import LandingPage from "./pages/landing.page";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(() => {
    const token = localStorage.getItem("authToken");
    return !!token;
  });
  const [userRole, setUserRole] = React.useState<"USER" | "ADMIN" | null>(
    () => {
      return localStorage.getItem("userRole") as "USER" | "ADMIN" | null;
    },
  ); // Default role is 'user'

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUserRole={setUserRole}
          />
        }
      >
        {/* Show HomePage if logged in, otherwise show LandingPage */}
        <Route
          path="/"
          element={
            isLoggedIn ? <HomePage userRole={userRole} /> : <LandingPage />
          }
        />

        {/* Public Routes that are accessible to all users */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Only accessible if logged in */}
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <LandingPage />}
        />
        {/* If user is logged in, redirect from /landing to home, otherwise show landing page */}
        <Route
          path="/landing"
          element={isLoggedIn ? <Navigate to="/" /> : <LandingPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
