const mongoose = require('mongoose');
const videoSchema = require('./VideoSchema');
const ExpressApp = require('./expressModule.js');

const Video = mongoose.model('Video', videoSchema);
mongoose.connect('mongodb://localhost:27017/domaciBackend', {useNewUrlParser: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});
console.log('connection with MonogDB started on port 27017');

addNewVideo = function(req,res) //connected in .expressModule.js
{
    const newVideo =new Video(req.body);
    newVideo.save().then(() => console.log("New video added"));
    console.log(req);
    res.send("New Video added!");
}

getAllVideos = function(req,res)
{
    Video.find({}, function(err,result) 
    {
        if(err)
            console.log(err);
        else
        {
            res.json(result);
            console.log("data sent");
        }
    });
}

getVideoByID = function(req,res)
{
    let vID = req.query.videoId;
    Video.findById({_id:vID}, function(err,result)
    {
        if(err)
            console.log(err);
        else
        {
            res.json(result);
            console.log("data sent");
        }
    })
}

addLike = function(req,res)
{
    let vID = req.query.vid.trim();
    console.log("like added " + vID);
    
    var query = Video.findOneAndUpdate({_id:vID}, {$inc: { likes: 1}});
    
    query.exec();
    res.send("ok");
}

addDislike = function(req,res)
{   
    let vID = req.query.vid.trim();
    console.log("dislike added " + vID);
    var query = Video.findOneAndUpdate({_id:vID}, {$inc: { dislikes: 1}});
    
    query.exec();
    res.send("ok");
}

addNewReply = function(req,res)
{
    let vID = req.body.vID.trim();
    let cID = req.body.cID.trim();
    let author = req.body.author;
    let message = req.body.message;
    console.log(vID);
    console.log(cID);
    console.log(author);
    console.log(message);

    Video.findOne({_id:vID},function(err,result)
    {
        if(err)
            console.log("err");
        else
        {
            var index = 0;
            var final;
            result.comments.forEach(element => {
                if(element._id == cID)
                {
                    console.log(element.author);
                    final = index;
                }
                index++;
            });
            console.log(result);
            result.comments[final].replies.push({author:author,message:message});
            result.save();
        }
    });
    res.send("ok");

}

deleteComment = function(req,res)
{
   
    let vID = req.body.vID.trim();
    let cID = req.body.cID.trim();
    Video.updateOne( {_id: vID}, { $pull: { comments: { _id:cID } }} ).exec();
    res.send("ok");
    console.log("deleted comment");
}

addComment = function(req,res)
{
    let vID = req.body.vID.trim();
    let author = req.body.author;
    let message = req.body.message;

    Video.updateOne( {_id: vID}, { $push: { comments: {id: -1,author:author,message:message,replies:[]} }} ).exec();
    res.send("ok");
    console.log("added new comment");
}

deleteVideo = function(req,res)
{   
    
    console.log("a");
    let vID = req.body.vID.trim();
    Video.deleteOne( {_id: vID}).exec();
    res.send("ok");
    console.log("deleted video");
}
//one-liner testVideo
//const TestVideo = new Video({"title":"testVideoTitle","description":"testVideoDescription","author":"testVideoAuthor","likes":101,"dislikes":2,"comments":[{"id":0,"author":"testVideoCommentAuthor0","message":"testVideoCommentMessage0","replies":[{"author":"testVideoCommentReplyAuthor","message":"testVideoCommentReplyMessage"}]},{"id":1,"author":"testVideoCommentAuthor1","message":"testVideoCommentMessage1","replies":[]}]});
//TestVideo.save().then(() => console.log('VideoAdded'));
