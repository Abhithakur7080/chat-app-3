import React from "react";
import Avatar from "../../assets/user.png";
const Accounts = ({user, conversation, fetchMessages}) => {

  return (
    <div className="h-screen w-1/4 bg-secondary">
      <div className="flex items-center justify-center my-8">
        <div className="border-doubled border-2 border-[#0075FF] rounded-full relative">
          <img src={Avatar} alt="user" width={75} height={75} />
          <span className="absolute w-4 h-4 border-4 border-secondary rounded-full z-10 right-1 bottom-1 bg-green-700"></span>
        </div>
        <div className="ml-8">
          <h3 className="text-2xl">{user?.fullName}</h3>
          <p className="text-lg font-light">My account</p>
        </div>
      </div>
      <hr />
      <div className="mt-10 h-3/4">
        <div className="mx-8 text-blue-700 text-lg">Messages</div>
        <div className="h-[93%] w-full overflow-y-scroll scrollClass">
          {conversation.length>0 ?
          conversation.map(({ user, conservationId }) => (
            <div
              className="slide-right flex items-center py-4 mx-5 my-1 rounded-md shadow-lg cursor-pointer"
              key={user.id}
              onClick={() => fetchMessages(conservationId, user)}
            >
              <div className="rounded-full relative ml-3">
                <img src={Avatar} alt="user" width={50} height={50} />
                {"status" === "status" && (
                  <span className="absolute w-3 h-3 border-2 border-white rounded-full z-10 right-1 bottom-1 bg-green-700"></span>
                )}
              </div>
              <div className="ml-6">
                <h3 className="text-md">{user?.fullName}</h3>
                <p className="text-xs font-light">{user?.email}</p>
              </div>
            </div>
          )) 
          :
          <div className="h-3/4 flex items-center justify-center">
            <h1 className="text-center text-lg font-bold text-slate-600">No Convesation</h1></div>
        }
        </div>
      </div>
    </div>
  );
};

export default Accounts;
