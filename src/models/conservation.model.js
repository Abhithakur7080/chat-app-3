import mongoose, { Schema } from "mongoose";

const conservationSchema = Schema({
  members: {
    type: Array,
    required: true,
  },
});
export const Conservation = mongoose.model("conservation", conservationSchema);
