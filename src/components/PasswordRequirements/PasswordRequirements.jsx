// PasswordRequirements.js
import React from "react";
import "./PasswordRequirements.css"; // Import your CSS file

const PasswordRequirements = ({ fulfilledRequirements }) => {
  const requirements = [
    { label: "At least 8 characters", fulfilled: fulfilledRequirements.length >= 8 },
    { label: "At least one number", fulfilled: /\d/.test(fulfilledRequirements) },
    { label: "At least one uppercase letter", fulfilled: /[A-Z]/.test(fulfilledRequirements) },
    // Add more password requirements as needed
  ];

  return (
    <div className="password-requirements">
      <h6>Password Requirements:</h6>
      <ul>
        {requirements.map((req, index) => (
          <li key={index} className={req.fulfilled ? "fulfilled" : ""}>
            {req.label} {req.fulfilled && <span>&#10003;</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
