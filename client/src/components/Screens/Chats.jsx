import React from "react";
import Avatar from "../../assets/user.png";
import { FaPhoneVolume } from "react-icons/fa6";
import Input from "../Inputs/Input";
import { BsSend } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";

const Chats = ({ messages, user, message, sendMessage, setMessage }) => {
  return (
    <div className="w-1/2 border bg-white h-screen md:flex flex-col items-center">
      {messages?.receiver?.fullName && (
        <div className="scale-up-hor-center w-3/4 bg-secondary h-[80px] my-5 rounded-full flex items-center px-3">
          <img src={Avatar} alt="user" width={60} height={60} />
          <div className="ml-3">
            <h3 className="text-lg font-semibold">
              {messages?.receiver?.fullName}
            </h3>
            <p className="text-sm font-light leading-3">{message?.receiver?.email}</p>
          </div>
          <div className="ml-auto pr-4 text-gray-700">
            <FaPhoneVolume size={25} />
          </div>
        </div>
      )}
      <div className="h-3/4 w-full overflow-y-auto scrollClass">
        <div
          className={`min-h-full px-10 py-14 flex flex-col ${messages?.messages?.length > 0 ? "justify-end" : "justify-center"}`}
        >
          {messages?.messages?.length > 0 ? (
            messages?.messages?.map(({ message, user: { id } = {} }) => (
              <div
                className={`min-w-2 max-w-[40%] mt-2  rounded-b-lg shadow-md  relative p-4 ${id === user?.id ? "bg-secondary rounded-tr-lg scale-up-tl" : "ml-auto bg-blue-600 rounded-tl-lg text-white scale-up-tr"}`}
              >
                <div
                  className={`absolute top-0   border-[0.5rem]  border-r-secondary  ${id === user?.id ? "-left-4 border-t-secondary border-l-transparent border-b-transparent" : "-right-3 border-t-blue-600 border-l-blue-600 border-r-transparent border-b-transparent"}`}
                ></div>
                {message}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <h1 className="text-center text-lg font-bold text-slate-600">
                No Convesation
              </h1>
            </div>
          )}
        </div>
      </div>
      {messages?.receiver?.fullName && (
        <div className="p-6 w-full flex items-center">
          <Input
            placeholder="type a messege..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-4 border-0 shadow-lg rounded-full outline-slate-500"
          />
          <div
            className={`ml-6 text-center ${!message && "pointer-events-none"}`}
            onClick={() => sendMessage()}
          >
            <BsSend size={33} color="#636566" />
          </div>
          <div
            className={`ml-6 text-center ${!message && "pointer-events-none"}`}
          >
            <GoPlusCircle size={33} color="#636566" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
