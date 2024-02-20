import React from "react";
import Avatar from "../../assets/user.png";

const Peoples = ({ users, fetchMessages, peoples }) => {
  return (
    <div className="w-1/4 border-black h-screen bg-light">
      <div className="p-6 text-center border-b-2">
        <h3 className="text-primary text-lg">Online {peoples?.length}</h3>
      </div>
      <div className="h-[88%] w-full overflow-y-scroll scrollClass">
        {users.length > 0 ? (
          users.map(({ user }) => {
            return (
              <div
                className={`slide-left flex items-center py-4 mx-5 my-1 rounded-md shadow-lg cursor-pointer`}
                onClick={() => fetchMessages('new', user)}
              >
                <div className="rounded-full relative ml-3">
                  <img src={Avatar} alt="user" width={50} height={50} />
                  {"status" === "Available" && (
                    <span className="absolute w-3 h-3 border-2 border-white rounded-full z-10 right-1 bottom-1 bg-green-700"></span>
                  )}
                </div>
                <div className="ml-6">
                  <h3 className="text-md">{user?.fullName}</h3>
                  <p className="text-xs font-light">{user.email}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="text-center text-lg font-bold text-slate-600">
              No Convesation
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Peoples;
