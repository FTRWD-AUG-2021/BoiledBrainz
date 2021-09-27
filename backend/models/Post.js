const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: String,
    post: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
},
    { timestamps: true }
)

module.exports = model('Post', postSchema);