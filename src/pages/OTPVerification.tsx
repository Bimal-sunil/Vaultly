import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { supabase } from "../../utils/supabase";
import { toast } from "sonner";

function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { email?: string; name?: string } | null;

  const [otp, setOtp] = useState("");
  const [validationError, setValidationError] = useState<string>("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const email = state?.email || "";

  useEffect(() => {
    // If there's no email in state, redirect back to login
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!email) return null;

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!otp || otp.length !== 6 || !/^[0-9]{6}$/.test(otp)) {
      setValidationError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    
    setIsVerifying(false);

    if (error) {
      setValidationError(
        error.code === "otp_expired" ? "OTP Expired" : "Invalid OTP",
      );
      console.error("Error verifying OTP:", error);
    }
    if (session) {
      setValidationError("");
      navigate("/");
      console.log("OTP verified successfully:", session);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const { error, data } = await supabase.auth.signInWithOtp({
        email,
      });
      if (error) throw error;

      setTimer(30);
      setCanResend(false);
      toast.success("OTP Sent!", {
        description: "A new code has been sent to your email.",
      });
    } catch (err: any) {
      console.error(err);
      if (err.status === 429 || err.message?.toLowerCase().includes("rate limit")) {
        toast.error("Rate Limit Exceeded", { description: "Please wait 60 seconds before requesting another email." });
      } else {
        toast.error("Failed to resend OTP", { description: err.message });
      }
    } finally {
      setIsResending(false);
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
          If an account exists, an OTP was sent to <br />
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
          <Button label="Verify & Proceed" onClick={() => handleVerifyOtp()} isLoading={isVerifying} />
          <button
            type="button"
            className="text-accent-bg hover:text-light p transition-colors disabled:opacity-50"
            onClick={() => navigate(-1)}
            disabled={isVerifying || isResending}
          >
            Go Back
          </button>

          <div className="mt-2 text-sm">
            {canResend ? (
              <button
                type="button"
                className="text-accent font-medium hover:brightness-110 transition-colors disabled:opacity-50"
                onClick={handleResendOtp}
                disabled={isResending || isVerifying}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            ) : (
              <p className="text-accent-bg">
                Resend OTP in{" "}
                <span className="font-medium text-light">{timer}s</span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default OTPVerification;
