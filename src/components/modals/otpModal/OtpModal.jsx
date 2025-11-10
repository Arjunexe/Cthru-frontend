import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./otpModal.css";
import API from "../../../api/axios";

export default function OtpModal({
  handleClick,
  handleOtp,
  onClose,
  EmailOrMobile,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return; // only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  async function handleVerify() {
    try {
      const enteredOtp = otp.join("");
      console.log("all otp: ", enteredOtp);
      if (enteredOtp.length < 6) {
        alert("Please enter all 6 digits of the OTP");
        return;
      }

      const response = await API.post("/user/otpVerify", {
        EmailOrMobile,
        enteredOtp,
      });

      if (!response.data.success) {
        console.log("response from otp verify: ", response.data.success);
      } else {
        console.log("response from otp verify: ", response.data.success);
        handleClick();
      }
    } catch (error) {
      console.log("error during handleVerify: ", error);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-96 p-6 rounded-2xl bg-white/5 border-2 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-3xl flex flex-col items-center space-y-5 noise-textures"
        >
          <h2 className="text-white text-xl font-semibold z-10">
            OTP Authentication
          </h2>
          <span className="text-white z-10 ">
            Enter the 6-digit OTP sent to your email.
          </span>

          <div className="flex space-x-2 z-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)} // 👈 handle backspace here
                className="w-10 h-12 text-center text-lg font-semibold text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400  backdrop-blur-md transition-all"
              />
            ))}
          </div>

          <div>
            <span>
              Don't get the code?{" "}
              <button
                className="text-violet-500 cursor-pointer hover:underline"
                onClick={handleOtp}
              >
                Resend OTP
              </button>
            </span>
          </div>

          <div className="flex space-x-4 z-10">
            <button
              onClick={handleVerify}
              className="px-5 py-2 rounded-xl bg-indigo-500/80 hover:bg-indigo-500 text-white font-medium backdrop-blur-md transition"
            >
              Verify
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-md transition"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
