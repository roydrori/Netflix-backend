import mongoose, { Schema } from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default: 'https://i.pravatar.cc/300',
      required: true,
    },
    nickname: {type: String, required: true, default: "nick"},
    myList: [{ type: Schema.Types.ObjectId, ref: 'Content', required: true}],
    isAdmin: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);
const User = mongoose.model('User', UserSchema);
export default User;
