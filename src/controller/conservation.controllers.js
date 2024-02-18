import { Conservation } from "../models/conservation.model.js";
import { User } from "../models/user.model.js";

export const createConservation = async (req, res) => {
  try {
    const { receiverId, senderId } = req.body;
    const newConservation = await new Conservation({
      members: [senderId, receiverId],
    });
    await newConservation.save();
    res
      .status(200)
      .send({ success: true, message: "conservation created successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
export const findConservation = async (req, res) => {
  try {
    const { userId } = req.params;
    const conservations = await Conservation.find({
      members: { $in: [userId] },
    });
    const conservationData = await Promise.all(
      conservations.map(async (conservation) => {
        const receiverId = conservation.members.find(
          (member) => member !== userId
        );
        const user = await User.findById(receiverId);
        return {
          user: { receiverId: user._id, email: user.email, fullName: user.fullName },
          conservationId: conservation._id,
        };
      })
    );
    res
      .status(200)
      .send({
        success: true,
        message: "conservation got successfully",
        conservationData,
      });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
