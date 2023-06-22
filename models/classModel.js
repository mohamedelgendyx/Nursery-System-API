const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const schema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String },
    supervisor: { type: mongoose.Types.ObjectId, ref: "teachers", required: true },
    children: [{
        type: Number,
        required: true,
        ref: "childs"
    }]
})

schema.plugin(autoIncrement.plugin, {
    model: 'classes',
    startAt: 1,
    incrementBy: 1
})

mongoose.model("classes", schema);
