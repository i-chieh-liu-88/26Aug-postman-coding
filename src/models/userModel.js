import mongoose from "mongoose";

// Schema Beschreiben
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// Model Erstellen(create)
const UserModel = mongoose.model("User", userSchema);

// Model Exportieren
export default UserModel;
