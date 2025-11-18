import React from "react";

const Register = () => {
  const handleTestClick = () => {
    console.log("This is the ultimate test. If you see this, onClick works.");
  };

  return (
    <div className="container mt-5">
      <h2>Register Page</h2>
      <p>This is a test.</p>
      <button type="button" className="btn btn-primary" onClick={handleTestClick}>
        Click Me
      </button>
      <p className="mt-3 text-center">Already have an account? <a href="/">Login here</a></p>
    </div>
  );
};

export default Register;