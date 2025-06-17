import React, { useState } from "react";
import {Input, Button} from "../../components/CommonCard";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";
import { BiLogoTelegram } from "react-icons/bi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginForm = () => {
  // State to hold form values and error messages
  const [formData, setFormData] = useState({
    emailOrPhone: "",
  });
  const [errors, setErrors] = useState({
    emailOrPhone: "",
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Validate input fields
  const validate = () => {
    const newErrors = {};
    const emailOrPhone = formData.emailOrPhone;

    // Check if email or phone is empty
    if (!emailOrPhone) {
      newErrors.emailOrPhone = "Email or phone number is required";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailOrPhone) && !/^\d+$/.test(emailOrPhone)) {
      // Check for invalid email or phone format
      newErrors.emailOrPhone = "Invalid email or phone number format";
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the input
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Store email/phone in localStorage for later use
      localStorage.setItem("emailPhone", formData.emailOrPhone);

      // Navigate to EnterPassword page
      navigate("/enter-password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email/Phone number"
        placeholder="Email/Phone (without country code)"
        name="emailOrPhone"
        value={formData.emailOrPhone}
        onChange={handleChange}
        error={errors.emailOrPhone}
      />
      <Button variant="primary" className="w-full text-center" type="submit">
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

export default LoginForm;
