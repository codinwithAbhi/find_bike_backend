import mongoose from'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is require"]
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is require"]
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password is require"]
        },
    }
);

const Users = mongoose.model('User', userSchema);

export default Users;