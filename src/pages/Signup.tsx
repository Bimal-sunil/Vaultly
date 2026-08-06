import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Do nothing for now as per user instruction
    console.log("Signup", { name, email, password });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <div className="text-center">
        <h1 className="font-primary text-4xl font-semibold text-light mb-2">Create Account</h1>
        <p className="text-accent-bg">Join Vaultly today</p>
      </div>

      <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSignup}>
        <InputField
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          <Button label="Sign Up" onClick={() => handleSignup()} />
        </div>
      </form>

      <p className="text-light">
        Already have an account?{" "}
        <Link to="/login" className="text-accent font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default Signup;
