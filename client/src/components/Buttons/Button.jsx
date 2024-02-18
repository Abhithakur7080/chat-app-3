import React from "react";

const Button = ({ label = "Button", type = "button", className = "" }) => {
  return (
    <div className="w-3/4">
      <button
        type={type}
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-2.5 py-2 text-center ${className}`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
