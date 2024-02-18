import { Conservation } from "../models/conservation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { conservationId, senderId, message, receiverId = "" } = req.body;
    if (!senderId || !message) {
      return res.status(404).send({
        success: false,
        message: "Please fill message",
      });
    }
    if (conservationId === "new" && receiverId) {
      const newConservation = await new Conservation({
        members: [senderId, receiverId],
      });
      await newConservation.save();
      const newMessage = new Message({
        conservationId: newConservation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res
        .status(200)
        .send(
          { success: true, message: "conservation created successfully" },
          newMessage
        );
    } else if (!conservationId && !receiverId) {
      return res.status(404).send({
        success: false,
        message: "Please send receiver id",
      });
    }
    const newMessage = new Message({ conservationId, senderId, message });
    await newMessage.save();
    res.status(200).send({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
export const receiveMessage = async (req, res) => {
  try {
    const checkMessages = async (conservationId) => {
      const messages = await Message.find({ conservationId: conservationId });
      const messageUserData = await Promise.all(
        messages.map(async (message) => {
          const user = await User.findById(message.senderId);
          return {
            user: { id: user._id, email: user.email, fullName: user.fullName },
            message: message.message,
          };
        })
      );
      res.status(200).send({
        success: true,
        message: "Message received successfully",
        messageUserData,
      });
    };

    const { conservationId } = req.params;
    if (conservationId === "new") {
      const checkConservation = await Conservation.find({
        members: { $all: [req.query.senderId, req.query.receiverId] },
      });
      if (checkConservation.length > 0) {
        checkMessages(checkConservation[0]._id);
      } else {
        return res.status(200).send([]);
      }
    } else {
      checkMessages(conservationId);
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
