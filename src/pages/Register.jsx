import React from "react";
import RegisterForm from "../partials/Register/RegisterForm";

const Register = () => {
  return (
    <div className=" flex flex-col gap-[1rem] items-center justify-center px-[1rem] sm:px-0 py-[2rem] bg-white">
      <div className="w-full max-w-sm p-6 sm:p-8 border-2 border-gray-200 rounded-3xl">
        <div className="mb-8 flex flex-col text-center gap-4">
          <div className="flex flex-row items-center justify-start gap-2">
            <img src="" alt="logo" className=" " />
            <h1 className="text-[#F0B90B] text-xl font-bold">BINANCE</h1>
          </div>

          <h1 className="text-3xl font-semibold text-left text-[#202630]">Welcome to Binance</h1>
        </div>
        <RegisterForm />
      </div>
      <div className="text-center flex flex-row gap-2">
        <a href="/register" className="text-yellow-600 hover:text-yellow-400  font-semibold text-sm">
         Sign up as an entity <span className="text-gray-800/70">or {" "}</span>
        </a>
        <a href="/login" className="text-yellow-600 hover:text-yellow-400 font-semibold text-sm">Log in</a>
      </div>
    </div>
  );
};

export default Register;
