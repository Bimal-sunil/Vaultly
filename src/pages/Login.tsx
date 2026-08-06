import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Do nothing for now as per user instruction
    console.log("Login", { email, password });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <div className="text-center">
        <h1 className="font-primary text-4xl font-semibold text-light mb-2">Welcome Back</h1>
        <p className="text-accent-bg">Log in to your Vaultly account</p>
      </div>

      <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleLogin}>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-4 flex justify-center">
          <Button label="Log In" onClick={() => handleLogin()} />
        </div>
      </form>

      <p className="text-light">
        Don't have an account?{" "}
        <Link to="/signup" className="text-accent font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
