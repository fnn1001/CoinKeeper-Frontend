// DEPENDENCIES
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

// CONTEXT
import { AuthContext } from "../../context/auth.context";

// STYLES
import "./SignupPage.css";


function SignupPage() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Navigation
  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext)

  // Event handlers
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
    setErrorMessage(undefined);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check for missing fields
    if (!email || !password || (!isLogin && !name)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Check if password meets requirements
    const passwordRequirementsMet =
      password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);

    if (!passwordRequirementsMet) {
      setErrorMessage("Password does not meet requirements.");
      return;
    }

    // Create request body
    const requestBody = isLogin ? { email, password } : { email, password, name };

    try {
      // Make API request based on login or signup
      const response = isLogin
        ? await authService.login(requestBody)
        : await authService.signup(requestBody);

      console.log("response")
      console.log(response.data)

      // If successful, redirect to the home page
      const authToken = response.data.authToken;
      localStorage.setItem("authToken", authToken)

      if (isLogin) {
        const { data: userInfo } = await authService.verify()
        const { data: userId }= await authService.verify()

        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        localStorage.setItem("userID", JSON.stringify(userId))

        console.log("userInfo", userInfo)
        console.log("userID", userInfo._id)



        // anywhere else:
        // const userInfo = JSON.parse(localSotrage.getItem("userInfo"))
        // const { _id } = userInfo
      }

      authenticateUser()

      navigate("/");
    } catch (error) {
      // If there's an error, set the error message in the state
      const errorDescription = error.response?.data?.message || "An error occurred.";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="section" style={{ color: "white" }}>
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log" onClick={handleFormToggle}></label>
              <div className={`card-3d-wrap mx-auto ${isLogin ? "" : "flipped"}`}>
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">{isLogin ? "Log In" : "Sign Up"}</h4>
                        <div className="form-group">
                          {isLogin ? (
                            <>
                              <input
                                type="email"
                                name="email"
                                className="form-style"
                                placeholder="Your Email"
                                id="email"
                                autoComplete="off"
                                value={email}
                                onChange={handleEmail}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </>
                          ) : (
                            <>
                              <input
                                type="text"
                                name="name"
                                className="form-style"
                                placeholder="Your Full Name"
                                id="name"
                                autoComplete="off"
                                value={name}
                                onChange={handleName}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </>
                          )}
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Your Password"
                            id="password"
                            autoComplete="off"
                            value={password}
                            onChange={handlePassword}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <p className="password-requirements">
                          Password Requirements:
                          <ul>
                            <li>At least 8 characters</li>
                            <li>At least one number</li>
                            <li>At least one capital letter</li>
                          </ul>
                        </p>
                        <button
                          type="submit"
                          className="btn mt-4"
                          onClick={handleFormSubmit}
                        >
                          {isLogin ? "Login" : "Sign up"}
                        </button>
                        {isLogin && (
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        )}
                        {errorMessage && (
                          <p className="text-danger mt-3">{errorMessage}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-style"
                            placeholder="Your Full Name"
                            id="name"
                            autoComplete="off"
                            value={name}
                            onChange={handleName}
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            id="email"
                            autoComplete="off"
                            value={email}
                            onChange={handleEmail}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="password"
                            className="form-style"
                            placeholder="Your Password"
                            id="password"
                            autoComplete="off"
                            value={password}
                            onChange={handlePassword}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button
                          type="submit"
                          className="btn mt-4"
                          onClick={handleFormSubmit}
                          style={{ color: "white" }}
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
