import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { supabase } from "../../utils/supabase";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let hasError = false;
    const newErrors = { firstName: "", lastName: "", email: "" };

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      hasError = true;
    }
    if (!email.trim()) {
      newErrors.email = "Email address is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Unable to create user!", error);
      return;
    }

    navigate("/verify", {
      state: { email, name: `${firstName.trim()} ${lastName.trim()}` },
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <div className="text-center">
        <h1 className="font-primary text-4xl font-semibold text-light mb-2">
          Create Account
        </h1>
        <p className="text-accent-bg">Join Vaultly today</p>
      </div>

      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSendOtp}
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <InputField
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors({ ...errors, firstName: "" });
            }}
            error={errors.firstName}
          />
          <InputField
            label="Last Name (Optional)"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) setErrors({ ...errors, lastName: "" });
            }}
            error={errors.lastName}
          />
        </div>
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          error={errors.email}
        />
        <div className="mt-4 flex justify-center">
          <Button label="Send OTP" onClick={() => handleSendOtp()} isLoading={isSubmitting} />
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
