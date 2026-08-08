import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) {
      setError("This field is required");
      return;
    }

    setError("");
    console.log("Send OTP to", email);
    navigate("/verify", { state: { email } });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <div className="text-center">
        <h1 className="font-primary text-4xl font-semibold text-light mb-2">
          Welcome Back
        </h1>
        <p className="text-accent-bg">Log in to your Vaultly account</p>
      </div>

      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSendOtp}
      >
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          error={error}
        />
        <div className="mt-4 flex justify-center">
          <Button label="Send OTP" onClick={() => handleSendOtp()} />
        </div>
      </form>

      <p className="text-light">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-accent font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
