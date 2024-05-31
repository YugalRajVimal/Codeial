const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    liked:{
        type:Boolean,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
},
{
    timestamps:true
}
);

const like = mongoose.model('like', likeSchema);
module.exports = like;
