import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  provider: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
