import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import "./SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  // State variables for password requirements
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [passwordContainsNumber, setPasswordContainsNumber] = useState(false);
  const [passwordContainsUppercase, setPasswordContainsUppercase] = useState(false);

  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    if (!isLogin) {
      // Update state based on password requirements
      setPasswordLengthValid(pwd.length >= 8);
      setPasswordContainsNumber(/\d/.test(pwd));
      setPasswordContainsUppercase(/[A-Z]/.test(pwd));
    }
  };
  const handleName = (e) => setName(e.target.value);

  const handleFormToggle = () => {
    setIsLogin(!isLogin);
    setErrorMessage(undefined);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isLogin) {
      const passwordRequirementsMet = passwordLengthValid && passwordContainsNumber && passwordContainsUppercase;
      if (!passwordRequirementsMet) {
        setErrorMessage("Password does not meet requirements.");
        return;
      }
    }

    const requestBody = isLogin ? { email, password } : { email, password, name };
    try {
      const response = isLogin ? await authService.login(requestBody) : await authService.signup(requestBody);
      const authToken = response.data.authToken;
      localStorage.setItem("authToken", authToken);

      if (isLogin) {
        const { data: userInfo } = await authService.verify();
        const { data: userId } = await authService.verify();

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("userID", JSON.stringify(userId));
      }

      authenticateUser();
      navigate("/");
    } catch (error) {
      const errorDescription = error.response?.data?.message || "An error occurred.";
      setErrorMessage(errorDescription);
    }
  };

  const renderPasswordRequirements = () => {
    if (!isLogin) {
      return (
        <div className="password-requirements">
          Password Requirements:
          <ul>
            <li style={{ color: passwordLengthValid ? 'green' : 'inherit' }}>
              {passwordLengthValid ? '✔ ' : ''}At least 8 characters
            </li>
            <li style={{ color: passwordContainsNumber ? 'green' : 'inherit' }}>
              {passwordContainsNumber ? '✔ ' : ''}At least one number
            </li>
            <li style={{ color: passwordContainsUppercase ? 'green' : 'inherit' }}>
              {passwordContainsUppercase ? '✔ ' : ''}At least one capital letter
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="section" style={{ color: "white" }}>
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log" onClick={handleFormToggle}></label>
              <div className={`card-3d-wrap mx-auto ${isLogin ? "" : "flipped"}`}>
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">{isLogin ? "Log In" : "Sign Up"}</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            className="form-style"
                            placeholder="Your Email"
                            id="login-email"
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
                            id="login-password"
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
                          Login
                        </button>
                        <p className="mb-0 mt-4 text-center">
                          <a href="#0" className="link">
                            Forgot your password?
                          </a>
                        </p>
                        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
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
                            id="signup-name"
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
                            id="signup-email"
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
                            id="signup-password"
                            autoComplete="off"
                            value={password}
                            onChange={handlePassword}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        {renderPasswordRequirements()}
                        <button
                          type="submit"
                          className="btn mt-4"
                          onClick={handleFormSubmit}
                        >
                          Sign up
                        </button>
                        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
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
