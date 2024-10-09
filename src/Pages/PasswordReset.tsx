import React, { useState } from "react";
import { Mail, Lock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { apiClient } from "../Components/Axios";
import { FormInput } from "../Components/Common";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // For generating a random number.
  const [randomNumber, setRandomNumber] = useState("");

  // const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    // Simulate sending OTP
    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setRandomNumber(generateOtp);

    await apiClient.post(
      "/api/email",
      {
        from: "hostahelthcare@gmail.com",
        to: email,
        subject: "Reset Password",
        text: `Otp for reseting your password is ${generateOtp}`,
      },
      { withCredentials: true }
    );
    setStep(2);
    setSuccess("OTP sent to your email address.");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    // Simulate OTP verification
    if (otp === randomNumber) {
      setStep(3);
      setSuccess("OTP verified successfully.");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    // Simulate password reset
    console.log("Resetting password for:", email);
    setStep(4);
    setSuccess("Password reset successfully.");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  OnChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Send OTP
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Enter OTP
              </label>
              <div className="relative">
                <CheckCircle
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  type="text"
                  id="otp"
                  value={otp}
                  OnChange={(e: any) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  OnChange={(e: any) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  OnChange={(e: any) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </form>
        );
      case 4:
        return (
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
            <h3 className="mt-2 text-xl font-semibold text-green-800">
              Password Reset Successful
            </h3>
            <p className="mt-2 text-green-600">
              Your password has been successfully reset.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          Reset Password
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <AlertCircle className="mr-2" size={18} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
            <CheckCircle className="mr-2" size={18} />
            <span>{success}</span>
          </div>
        )}
        {renderStep()}
      </div>
    </div>
  );
};

export default PasswordReset;
