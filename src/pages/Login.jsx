import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, RefreshCcw, ArrowLeft, ChevronDown } from "lucide-react";
import { GrLanguage } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../ReduxStateManagement/user/authSlice";
import { useTranslation } from "react-i18next";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdRefresh } from "react-icons/io";
import logo from "../images/softwareImages/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // Available languages
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "it", name: "Italiano" },
    { code: "pl", name: "Polski" },
    { code: "id", name: "Indonesian" },
    { code: "th", name: "Thai" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "zh", name: "中文" },
    { code: "tr", name: "Türkçe" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "fa", name: "فارسی" },
    { code: "sr", name: "Српски" },
    { code: "ro", name: "Română" },
    { code: "hr", name: "Hrvatski" },
    { code: "hi", name: "हिन्दी" },
    { code: "el", name: "ελληνικά" },
    { code: "bn", name: "বাংলা" },
    { code: "uk", name: "Українська" },
    { code: "fil", name: "Pilipinas" },
    { code: "ar", name: "العربية" },
    { code: "sw", name: "Kiswahili" },
  ];

  const isAuthenticated = useSelector((state) => !!state.auth.token);

  const generateToken = () => {
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36).substring(2, 15);
    const tokenPayload = `${timestamp}-${randomPart}`;

    // Base64 encode for added obfuscation
    return btoa(tokenPayload);
  };

  // Validate token function
  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const decodedToken = atob(token);
      const [timestamp] = decodedToken.split("-");
      const tokenAge = Date.now() - parseInt(timestamp);

      // Token valid for 24 hours
      return tokenAge < 24 * 60 * 60 * 1000;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem("authToken");
      const userEmail = localStorage.getItem("userEmail");

      if (authToken && userEmail && isTokenValid(authToken)) {
        dispatch(
          login({
            user: { email: userEmail },
            token: authToken,
            loginTimestamp: parseInt(localStorage.getItem("tokenCreatedAt") || Date.now()),
          })
        );

        if (window.location.pathname !== "/dashboard") {
          navigate("/dashboard");
        }
      }
    };

    checkAuthStatus();
  }, [dispatch, navigate]);


  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Generate CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Change language handler
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setLanguageMenuOpen(false);
  };

  // Get current language
  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  // Function to generate random CAPTCHA text
  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let captcha = "";

    // Generate random text
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#f0f0f0");
    gradient.addColorStop(1, "#e0e0e0");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise (dots)
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${
        Math.random() * 100
      }, 0.2)`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }

    // Add lines
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${
        Math.random() * 100
      }, 0.3)`;
      ctx.stroke();
    }

    // Draw text
    ctx.font = "bold 26px Arial";
    ctx.fillStyle = "#6b21a8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw each character with slight rotation for added security
    const textWidth = ctx.measureText(captcha).width;
    const startX = canvas.width / 2 - textWidth / 2;
    const charWidth = textWidth / captcha.length;

    for (let i = 0; i < captcha.length; i++) {
      const char = captcha.charAt(i);
      const x = startX + i * charWidth + charWidth / 2;
      const y = canvas.height / 2;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = t("errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("errors.emailInvalid");
    }

    if (!password) {
      newErrors.password = t("errors.passwordRequired");
    } else if (password.length < 6) {
      newErrors.password = t("errors.passwordLength");
    }

    if (!userCaptcha) {
      newErrors.captcha = t("errors.captchaRequired");
    } else if (userCaptcha !== captchaText) {
      newErrors.captcha = t("errors.captchaMatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      // Generate a secure token
      const token = generateToken();

      if (rememberMe) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("tokenCreatedAt", Date.now());
      }

      // Dispatch login action
      dispatch(
        login({
          user: { email },
          token,
          loginTimestamp: Date.now(),
        })
      );

      // Navigate to dashboard after successful login
      navigate("/dashboard");
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle home page navigation
  const handleHomeNavigation = () => {
    navigate("/");
  };

  // Toggle language menu
  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center px-4 py-8">
      {/* Top navigation bar */}
      <div className="w-full max-w-lg flex justify-between items-center mb-4">
        <button
          onClick={handleHomeNavigation}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span className="font-medium text-sm sm:text-base">
            {t("navigation.toHome")}
          </span>
        </button>

        <div className="relative" ref={languageMenuRef}>
          <button
            onClick={toggleLanguageMenu}
            className="flex items-center text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            <span className="mr-2 font-medium">{currentLanguage.name}</span>
            <GrLanguage className="text-blue-600" />
            <ChevronDown size={16} className="ml-1 text-blue-600" />
          </button>

          {languageMenuOpen && (
            <div className="absolute right-0 mt-2 py-2 w-64 bg-white rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto border border-gray-100">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-3 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`text-left px-2 py-1 rounded hover:bg-blue-50 transition-colors duration-200 ${
                      i18n.language === lang.code
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-5 sm:p-8 border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-54 h-18"/>
              
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("auth.email")} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors.email ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">{errors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("auth.password")} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  errors.password ? "border-red-500" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-300"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">{errors.password}</p>
            )}
          </div>

          {/* CAPTCHA section */}
          <div className="mb-5">
            <div className="flex items-center mb-2">
              <canvas
                ref={canvasRef}
                width="200"
                height="60"
                className="border border-gray-300 rounded-lg"
              ></canvas>
              <button
                type="button"
                className="ml-2 p-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                onClick={generateCaptcha}
              >
                <RefreshCcw size={20} />
              </button>
            </div>
            <input
              type="text"
              className={`w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors.captcha ? "border-red-500" : ""
              }`}
              placeholder={t("auth.enterCaptcha")}
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
            />
            {errors.captcha && (
              <p className="text-red-500 text-xs mt-2">{errors.captcha}</p>
            )}
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-xs sm:text-sm text-gray-700"
              >
                {t("auth.rememberMe")}
              </label>
            </div>
            <div>
              <Link
                to="/password-recover"
                className="flex flex-row gap-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer group"
              >
                <IoMdRefresh className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-180 transition-all" />{" "}
                {t("auth.passwordRecovery")}
              </Link>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full text-sm sm:text-base bg-gradient-to-r from-blue-500 to-blue-800 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? t("auth.signingIn") : t("auth.signInButton")}
          </button>

          {/* OAuth login options */}
          <div className="mt-6">
            <div className="text-center text-sm text-gray-600 mb-4">
              {t("auth.orLoginWith")}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 flex items-center justify-center border border-gray-300 rounded-xl py-2 px-4 text-sm font-medium text-white bg-blue-500/90 hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
              >
                <FaFacebook className="w-5 h-5 text-white" />
                <span className="ml-2">Facebook</span>
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center border border-gray-300 rounded-xl py-2 px-4 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 cursor-pointer"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="ml-2">Google</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer links */}
      <div className="w-full max-w-md mt-8 mb-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600">
          <a
            href="#"
            className="hover:text-blue-600 hover:underline transition-all duration-300"
          >
            {t("footer.contacts")}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 hover:underline transition-all duration-300"
          >
            {t("footer.amlPolicy")}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 hover:underline transition-all duration-300"
          >
            {t("footer.paymentPolicy")}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 hover:underline transition-all duration-300"
          >
            {t("footer.termsConditions")}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 hover:underline transition-all duration-300"
          >
            {t("footer.privacyPolicy")}
          </a>
          <a
            href="#"
            className="hover:text-blue-600 hover:underline transition-all duration-300"
          >
            {t("footer.infoDisclosure")}
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex items-center justify-center text-xs sm:text-sm text-gray-600 mb-6">
        <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
        <div className="ml-2 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-xs text-white bg-blue-600">
          21+
        </div>
      </div>
    </div>
  );
};

export default Login;
