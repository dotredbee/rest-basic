const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const connection = mongoose.createConnection(process.env.MONGO_URI)

autoIncrement.initialize(connection)
const postSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true, 
    },
    author :  {
        type : String,
        required : true,
    },
    content : { 
        type : String,
        required : true
    }
}, {
    timestamps : true
})
postSchema.plugin(autoIncrement.plugin, {model : 'Post', field : 'postId'})
postSchema.statics.create = function(payload){
    const post = new this(payload);

    return post.save();
}
postSchema.statics.findAll = function() { 
    return this.find({});
}
postSchema.statics.findOneByPostId = function(postId) {
    return this.findOne({ postId })
}
postSchema.statics.updateByPostId = function(postId, payload) {
    return this.findOneAndUpdate({ postId }, payload, { new : true })
}
postSchema.statics.deleteByPostId = function(postId) { 
    return this.remove({ postId })
}
module.exports = mongoose.model("Post", postSchema)

