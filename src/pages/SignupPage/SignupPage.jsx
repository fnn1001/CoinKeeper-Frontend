import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/auth.service";
import "./SignupPage.css"; // Import your CSS file
import PasswordRequirements from "../../components/PasswordRequirements/PasswordRequirements";


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
    setErrorMessage(undefined); // Clear any error message when toggling forms
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const requestBody = isLogin ? { email, password } : { email, password, name };

    try {
      const response = isLogin
        ? await authService.login(requestBody)
        : await authService.signup(requestBody);

      const authToken = response.data.authToken;
      // Assuming you have these functions in your AuthContext
      // const { storeToken, authenticateUser } = useContext(AuthContext);
      // storeToken(authToken);
      // authenticateUser();
      navigate("/");
    } catch (error) {
      const errorDescription = error.response?.data?.message || "An error occurred.";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="section">
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
