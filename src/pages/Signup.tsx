import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [errors, setErrors] = useState({ firstName: "", lastName: "", contactInfo: "" });
  const navigate = useNavigate();

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    let hasError = false;
    const newErrors = { firstName: "", lastName: "", contactInfo: "" };

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      hasError = true;
    }
    if (!contactInfo.trim()) {
      newErrors.contactInfo = "Email or phone number is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    console.log("Send Signup OTP to", contactInfo);
    navigate("/verify", { state: { contactInfo, name: `${firstName.trim()} ${lastName.trim()}` } });
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
          label="Email or Phone Number"
          type="text"
          value={contactInfo}
          onChange={(e) => {
            setContactInfo(e.target.value);
            if (errors.contactInfo) setErrors({ ...errors, contactInfo: "" });
          }}
          error={errors.contactInfo}
        />
        <div className="mt-4 flex justify-center">
          <Button label="Send OTP" onClick={() => handleSendOtp()} />
        </div>
      </form>

      <p className="text-light">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-accent font-semibold hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

export default Signup;
