import mongoose, { Schema } from "mongoose";

export const messageSchema = Schema({
  conservationId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  message: {
    type: String,
  },
});
export const Message = mongoose.model("message", messageSchema);
