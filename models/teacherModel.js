const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['teacher', 'supervisor', 'admin'], default: 'teacher' },
    image: String
})

mongoose.model("teachers", schema);
