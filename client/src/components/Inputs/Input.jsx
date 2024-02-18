import React from "react";

const Input = ({
  label = "",
  name = "",
  type = "text",
  placeholder = "",
  isRequired = false,
  className = '',
  divClassName ='',
  value="",
  onChange=()=>{}
}) => {
  return (
    <div className={`w-3/4 ${divClassName}`}>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-800">{label}</label>
      <input
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
        type={type}
        id={name}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
