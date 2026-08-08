import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { supabase } from "../../utils/supabase";

function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { email?: string; name?: string } | null;

  const [otp, setOtp] = useState("");
  const [validationError, setValidationError] = useState<string>("");
  const email = state?.email || "";

  useEffect(() => {
    // If there's no email in state, redirect back to login
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  if (!email) return null;

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!otp || otp.length !== 6 || !/^[0-9]{6}$/.test(otp)) {
      setValidationError("Please enter a valid 6-digit OTP");
      return;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    if (error) {
      setValidationError(
        error.code === "otp_expired" ? "OTP Expired" : "Invalid OTP",
      );
      console.error("Error verifying OTP:", error);
    }
    if (session) {
      setValidationError("");
      console.log("OTP verified successfully:", session);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <div className="text-center">
        <h1 className="font-primary h2 text-light mb-2">Verify OTP</h1>
        <p className="text-accent-bg p">Secure your account</p>
      </div>

      <form
        className="w-full max-w-md flex flex-col gap-4 items-center"
        onSubmit={handleVerifyOtp}
      >
        <p className="text-light p text-center mb-2">
          Enter the OTP sent to <br />
          <span className="font-semibold text-accent">{email}</span>
        </p>
        <InputField
          label="6-Digit OTP"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          inputMode="numeric"
          error={validationError}
        />
        <div className="mt-4 flex flex-col items-center gap-4">
          <Button label="Verify & Proceed" onClick={() => handleVerifyOtp()} />
          <button
            type="button"
            className="text-accent-bg hover:text-light p transition-colors"
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
