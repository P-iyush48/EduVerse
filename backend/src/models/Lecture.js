const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
    {
        title: {type: String},
        type: {type: String},
        textContent: {type: String},
        fileUrl: {type: String},
    },
    {id: false},
);

const lectureSchema = mongoose.Schema({
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "chapters", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: Number,
    duration: { type: Number, required: true, default: 0 },
    thumbnail: { type: String, required: true },
    videoUrl: { type: String },
    materials: { type: [materialSchema], default: [] },
    quizes: { type: [mongoose.Schema.Types.ObjectId], ref: "quizes", default: [] }
}, { timestamps: true });

const lectureModel = mongoose.model("lectures", lectureSchema);
module.exports = lectureModel;