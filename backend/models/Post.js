const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: String,
    post: String,
    likes: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
},
    { timestamps: true }
)

module.exports = model('Post', postSchema);