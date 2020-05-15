const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors'); 
const path = require('path');
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


notImplemented = function(req,res){
    console.log(req.body);
    res.send("ERROR: change the action from default action fuction!!!");
}
addNewVideo = notImplemented;
getAllVideos = notImplemented;
getVideoByID = notImplemented;
addLike = notImplemented;
addDisike = notImplemented;
addNewReply = notImplemented;
deleteComment = notImplemented;
addComment = notImplemented;
deleteVideo = notImplemented;
//starting listener on port 3000
app.listen(3000, function() {console.log('Express started on port 3000')});

app.get('/', function(req, res) {
    console.log
    console.log(path.join(__dirname+'/mibpFrontend/index.html'));
    res.send("test");
});

app.get('/test', function(req, res) {
    console.log(req.body);
    res.send("working!!1");
});

app.get('/watch', (req,res) => getVideoByID(req,res));
app.get('/apiGetAllVideos', (req,res) => getAllVideos(req,res));

app.post('/apiUploadVideo', (req,res) => addNewVideo(req,res));
app.post('/apiSendLike', (req,res) => addLike(req,res));
app.post('/apiSendDislike', (req,res) => addDislike(req,res));
app.post('/apiAddReply', (req,res) => addNewReply(req,res));
app.post('/apiAddComment', (req,res) => addComment(req,res));

app.delete('/apiDeleteVideo', (req,res) => deleteVideo(req,res));
app.delete('/apiDeleteComment', (req,res) => deleteComment(req,res));
module.exports = app;
//module.exports = addNewVideo;