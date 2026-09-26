import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  email: { type: String, unique: true, trim: true, lowercase: true, required: true },
  age: { type: Number, min: 18, required: true },
  phoneNumber: { type: String, trim: true },
  password: { type: String, minlength: 8, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
