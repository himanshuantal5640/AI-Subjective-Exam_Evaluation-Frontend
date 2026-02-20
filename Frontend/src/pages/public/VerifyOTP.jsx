import React, { useState, useRef, useEffect } from "react";
import { verifyOTP, resendOTP } from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);

  // Countdown Timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (!/^\d*$/.test(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await verifyOTP({ email, otp: finalOtp });
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP({ email });
      setTimer(60);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Resend failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--card)] shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          OTP sent to {email}
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-between mb-6 gap-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* Resend Section */}
        <div className="text-center mt-4">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend available in {timer}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-indigo-600 text-sm font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;