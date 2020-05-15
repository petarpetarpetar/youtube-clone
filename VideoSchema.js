var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
module.exports =  VideoSchema = new mongoose.Schema({
    videoUrl: {
        type:String,
        required: true,
        unique: false
    },
    
    title :{
        type: String,
        maxlength: 40,
        required: true,
        unique: false
    },

    description: {
        required: true,
        type:String,
        unique: false
    },

    author:{
        type: String,
        maxlength: 21,
        required: true,
        unique: false
    },

    likes:{
        type: Number,
        unique: false,
        min: 0
    },

    dislikes: {
        type: Number,
        unique: false,
        min: 0
    },

    comments: [{
        id: {type: String, require: true, unique: false}, 
        author: {type:String, required:true, unique: false},
        message: {type:String, required:true, unique: false},
        replies: [
            {
                author: {type:String, required:true, unique: false},
                message: {type:String, required:true, unique: false}
            }
        ]
    }]
});
