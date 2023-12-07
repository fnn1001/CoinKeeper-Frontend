import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProviderWrapper, AuthContext } from "./context/auth.context";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BudgetsPage from "./pages/BudgetsPage/BudgetsPage";
import InvestPage from "./pages/Investment/Invest";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import Sidebar from "./components/Sidebar/Sidebar";

import "./App.css";

function App() {
  return (
    <AuthProviderWrapper>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/budgets" element={<BudgetsPage />} />

            <Route
              path="/profile"
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            />

            <Route
              path="/signup"
              element={
                <IsAnon>
                  <SignupPage />
                </IsAnon>
              }
            />
            <Route
              path="/login"
              element={
                <IsAnon>
                  <LoginPage />
                </IsAnon>
              }
            />

            <Route
              path="/invest"
              element={
                <AuthContext.Consumer>
                  <IsPrivate>
                      <InvestPage />
                     </IsPrivate> 
                </AuthContext.Consumer>
              }
            />
            <Route
              path="/budgets"
              element={
                <AuthContext.Consumer>
                  <IsPrivate>
                    <BudgetsPage />
                  </IsPrivate>
                </AuthContext.Consumer>
              }
            />

          </Routes>
        </div>
      </div>
    </AuthProviderWrapper>
  );
}

export default App;
