import React, { useEffect, useState } from "react";

import axios from "axios";

import Accounts from "../../components/Screens/Accounts";
import Chats from "../../components/Screens/Chats";
import Peoples from "../../components/Screens/Peoples";
import { io } from "socket.io-client";

const Dashboard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-detail"))
  );
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io("http://localhost:4000");
    setSocket(socketConnection);
  }, []);

  useEffect(() => {
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      console.log("active users :> ", users);
    });
    socket?.on('getMessage', data => {
      console.log("data", data);
      setMessages(prev => ({
        ...prev,
        messages: [...prev.messages, {user, message: data.messages}]
      }))
  })
  }, [socket, user]);
  const fetchConversation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/conversations/${user?.id}`
      );
      setConversation(response.data.conservationData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMessages = async (conservationId, receiver) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/message/${conservationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`
      );
      setMessages({
        messages: response.data.messageUserData,
        receiver: receiver,
        conservationId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async () => {
    try {
      setMessage("")
      socket?.emit("sendMessage", {
        conservationId: messages?.conservationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      });
      await axios.post(`http://localhost:8000/api/v1/message`, {
        conservationId: messages?.conservationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      });
      
    } catch (error) {
      console.log(error);
    }
  };
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/user/all-users/${user?.id}`
      );
      setUsers(response.data.userData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConversation();
    getAllUsers();
  }, []);

  return (
    <div className="w-screen flex">
      <Accounts
        user={user}
        conversation={conversation}
        fetchMessages={fetchMessages}
      />
      <Chats
        messages={messages}
        user={user}
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
      />
      <Peoples users={users} fetchMessages={fetchMessages} />
    </div>
  );
};

export default Dashboard;
