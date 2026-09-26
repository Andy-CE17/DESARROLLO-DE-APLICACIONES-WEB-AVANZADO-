import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    minlength: 10,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hashtags: { type: [String], default: [] },
  imageUrl: { type: String, trim: true, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

postSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: new Date() });
});

export default mongoose.model("Post", postSchema);
