import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true, 
      },
      provider: {
        type: String,
        default: "credentials",
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      forgotPasswordToken: String,
      forgotPasswordTokenExpiry: Date,
      verifyToken: String,
      verifyTokenExpiry: Date,
    },
    {
      timestamps: true,
    }
  );
  
  const User = mongoose.models.User || mongoose.model("User", userSchema);
  export default User;
  