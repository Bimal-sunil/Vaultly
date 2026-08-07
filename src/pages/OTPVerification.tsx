import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { contactInfo?: string; name?: string } | null;
  
  const [otp, setOtp] = useState("");
  const contactInfo = state?.contactInfo || "";

  useEffect(() => {
    // If there's no contact info in state, redirect back to login
    if (!contactInfo) {
      navigate("/login", { replace: true });
    }
  }, [contactInfo, navigate]);

  if (!contactInfo) return null;

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("Verify OTP", otp, "for", contactInfo, state?.name ? `Name: ${state.name}` : "(Login)");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <div className="text-center">
        <h1 className="font-primary text-4xl font-semibold text-light mb-2">Verify OTP</h1>
        <p className="text-accent-bg">Secure your account</p>
      </div>

      <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleVerifyOtp}>
        <p className="text-light text-center mb-2">
          Enter the OTP sent to <br />
          <span className="font-semibold text-accent">{contactInfo}</span>
        </p>
        <InputField
          label="6-Digit OTP"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          inputMode="numeric"
        />
        <div className="mt-4 flex flex-col items-center gap-4">
          <Button label="Verify & Proceed" onClick={() => handleVerifyOtp()} />
          <button
            type="button"
            className="text-accent-bg hover:text-light text-sm transition-colors"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default OTPVerification;
