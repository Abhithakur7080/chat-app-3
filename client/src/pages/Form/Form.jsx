import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Form = ({ isSignIn = false }) => {
  const [userData, setUserData] = useState({
    ...(!isSignIn && {
      fullName: "",
    }),
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/user/register", userData);
      if (!data.success) {
        toast.error(data?.message);
      }
      toast.success(data?.message);
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("User registration failed");
    }
  };
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      if(!userData.email){
        toast.error("please insert email")
        return;
      }
      if(!userData.password){
        toast.error("please insert password")
        return;
      }
      const { data } = await axios.post("http://localhost:8000/api/v1/user/login", userData);
      if (!data.success) {
        toast.error(data?.message);
      } else {
        localStorage.setItem("user-token", data.token);
        localStorage.setItem("user-detail", JSON.stringify(data.user))
        toast.success(data?.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("User logged in failed");
    }
  };
  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={isSignIn ? handleSignin : handleRegister}
        className="bg-white w-screen h-screen md:w-1/2 md:h-5/6 shadow-lg md:rounded-lg flex flex-col items-center justify-center scale-up-center"
      >
        <h1 className="text-4xl font-extrabold">
          Welcome {isSignIn && "Back"}
        </h1>
        <div className="text-2xl font-light mb-6">
          {isSignIn ? "Sign in to explore" : "Sign up now to get started"}
        </div>
        {!isSignIn && (
          <Input
            label="Full name"
            name="name"
            placeholder="Enter your full name..."
            type="text"
            className="mb-6"
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
          />
        )}

        <Input
          label="Email address"
          name="email"
          placeholder="Enter your email..."
          type="email"
          className="mb-6"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Enter your password..."
          type="password"
          className="mb-6"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <Button
          type="submit"
          label={isSignIn ? "Sign in" : "Sign up"}
          className="mb-2"
        />
        <div>
          {isSignIn ? "Didn't have any account" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => navigate(`/user/${isSignIn ? "signup" : "signin"}`)}
          >
            {isSignIn ? "Sign up" : "sign in"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Form;
