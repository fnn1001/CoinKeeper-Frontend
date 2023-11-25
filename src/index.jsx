import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// Contexts
import { BudgetsProvider } from "./context/BudgetsContext"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
      <AuthProviderWrapper>
        <BudgetsProvider>
          <App />
        </BudgetsProvider>
      </AuthProviderWrapper>
  </Router>
);
