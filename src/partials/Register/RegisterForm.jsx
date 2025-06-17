import React, { useState } from "react";
import {Input, Button} from "../../components/CommonCard";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";
import { BiLogoTelegram } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook from react-router-dom

const RegisterForm = () => {
  const [checked, setChecked] = useState(false);
  const [emailPhone, setEmailPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  // Function to toggle checkbox state
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  // Function to validate email/phone number
  const validateEmailPhone = (input) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number for simplicity
    return emailPattern.test(input) || phonePattern.test(input);
  };

  // Handle input change for email/phone number
  const handleInputChange = (e) => {
    const input = e.target.value;
    setEmailPhone(input);
    setIsValid(validateEmailPhone(input));
    setErrorMessage(""); // Clear error message as user types
  };

  // Handle Next button click
  const handleNextClick = (e) => {
    e.preventDefault(); // Prevent the default action (form submission)

    if (!isValid && !checked) {
      setErrorMessage("Please enter a valid email or phone number and agree to the terms.");
    } else if (!isValid) {
      setErrorMessage("Please enter a valid email or phone number.");
    } else if (!checked) {
      setErrorMessage("You must agree to the terms and conditions.");
    } else {
      // Store emailPhone in localStorage
      localStorage.setItem("emailPhone", emailPhone);
      
      // If everything is valid, navigate to EmailVerify with email
      navigate("/email-verify"); // No need to pass the data directly via state, as it's in localStorage
    }
  };

  return (
    <form className="space-y-6">
      <Input
        label="Email/Phone number"
        placeholder="Email/Phone (without country code)"
        value={emailPhone}
        onChange={handleInputChange}
      />
      {errorMessage && (
        <div className="text-red-500 text-sm ">{errorMessage}</div> 
      )}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="checkbox"
            id="terms"
            checked={checked}
            onChange={handleCheckboxChange}
            className="opacity-0 absolute w-6 h-6 cursor-pointer"
          />
          <div
            className={`w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center text-white ${checked ? "bg-yellow-600" : "bg-white"}`}
          >
            {checked && <FaCheck />}
          </div>
        </div>
        <label htmlFor="terms" className="text-sm text-gray-900/80">
          By creating an account, I agree to Binance's{" "}
          <span className="border-b-2 border-dotted border-gray-900/30 hover:text-gray-900 cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="border-b-2 border-dotted border-gray-900/30 hover:text-gray-900 cursor-pointer">
            Privacy Policy.
          </span>
        </label>
      </div>
      <Button
        variant="primary"
        className="w-full text-center mt-[1.5rem]"
        onClick={handleNextClick}
      >
        Next
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>
      <div className="space-y-3">
        <Button
          variant="secondary"
          className="w-full"
          icon={<FcGoogle />}
          iconPosition="left"
        >
          Continue with Google
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          icon={<RiAppleFill />}
          iconPosition="left"
        >
          Continue with Apple
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          icon={<BiLogoTelegram />}
          iconPosition="left"
        >
          Continue with Telegram
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
