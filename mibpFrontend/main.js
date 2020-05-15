console.log("hello");

var host = "http://localhost:3000/";
var likeSent = 0;


function sendNewVideoRequest()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://localhost:3000/apiUploadVideo', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let temp = document.getElementById("videoUrl").value.split('=')[1];
    xmlHttp.send(JSON.stringify({
        "videoUrl":temp,
        "title":document.getElementById("videoTitle").value,
        "description":"testVideoDescription",
        "author":"testVideoAuthor",
        "likes":101,
        "dislikes":2,
        "comments":[
            {
                "id":0,
                "author":"testVideoCommentAuthor0",
                "message":"testVideoCommentMessage0",
                "replies":[
                    {
                        "author":"testVideoCommentReplyAuthor",
                        "message":"testVideoCommentReplyMessage"
                    }
                ]
            },
            {
                "id":1,
                "author":"testVideoCommentAuthor1",
                "message":"testVideoCommentMessage1",
                "replies":[

                ]
            }
        ]
    }
    ));
    console.log(xmlHttp.responseText);
    location.reload(); 
    window.history.back();
    getAllVideos();
}

function getAllVideos() 
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://localhost:3000/apiGetAllVideos', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send();
    displayAllVideos(xmlHttp.responseText);
}

function addNewComment()
{


}

function sendLike(vID) 
{
    if(likeSent == 1) return;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://localhost:3000/apiSendLike?vid='+vID, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send();
    console.log("like sent");
    document.getElementById("numOfLikes").innerHTML= parseInt(document.getElementById("numOfLikes").innerHTML,10)+1;  
    likeSent = 1;
}
function sendDislike(vID) 
{
    if(likeSent == 1) return;
    console.log("dislike sent");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://localhost:3000/apiSendDislike?vid='+vID, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xmlHttp.send();
    document.getElementById("numOfDislikes").innerHTML= parseInt(document.getElementById("numOfDislikes").innerHTML,10)+1;  
    likeSent =1;
}


function displayAllVideos(responseText)
{
    temp = `<div class="container-fluid content-row">
    <div class="row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 d-flex align-items-stretch">  
    `;//ovde vidi jel treba da se menja kad bude description, verovartno nece biti ravno

    var DataArray = JSON.parse(responseText);
    DataArray.sort((a, b) => (a.likes > b.likes) ? -1 : 1);

    DataArray.forEach(element => {
        temp += `
            <div class="col-12 align-self-stretch p-2">
                    <div class="card semiTransparent text-center h-100">
                        <a href="./watch.html?videoId=${element._id}">
                            <img class="card-img-top w-100" src="https://img.youtube.com/vi/${element.videoUrl}/0.jpg" alt="Card image cap">
                        </a>
                        <div class="card-body mb-4 text-center">
                            <a href="./watch.html?videoId=${element._id}">
                            <h5 class="card-title">${element.title}</p>
                            <br />
                            </a>
                            <div type="button" class=" btn btn-danger" onclick="deleteVideo( &#34 ${element._id}&#34 )">Delete video!</div>
                        </div>
                    </div>
                
            </div>   
        `;
    });

    temp += `
        <div class="col-12 align-self-stretch p-2 py-4">
            <a href="./addNewVideoInterface.html">
                <div class="card m-2 h-90 text-center h-100" id="newVideoBtn" onmouseenter="increaseBrightness(&#34newVideoBtn&#34)" onmouseleave="decreaseBrightness(&#34newVideoBtn&#34)">
                    <div class="card-body mb-6 text-center">
                        <img src="./Resources/Plus.png" alt="add new video" class=" img-fluid">
                    </div>
                </div>
            </a>
        </div>
    `;

    temp += `</div></div>`
    document.getElementById('mainDisplay').innerHTML = temp;
}

function displaySingleVideo(responseText)
{
    var videoData = JSON.parse(responseText);
    temp = `
    <div class="embed-responsive embed-responsive-21by9">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${videoData.videoUrl}?autoplay=1&controls=0&showinfo=0"></iframe>
    </div>
    <h1 class="text-left font-weight-bold text-dark pl-4 w-100">${videoData.title}</h1>
    <div class="border-top border-dark w-100"></div>
    <br />
        <div class="container">
            <div class="row border-dark border-bottom">
                <div class ="col">
                    <h4 class="text-left text-dark pl-4 w-100">by: ${videoData.author}</h4>
                    <h6 class="text-left text-dark pl-4 w-100">${videoData.description}</h6>
                </div>
                <div class="col text-right d-flex justify-content-end">
                    <div class="col-2">
                        <i onclick="sendLike( &#34 ${videoData._id}&#34)" class="fa fa-thumbs-up col-12 fa-3x"></i>
                        <div class="col-12" id="numOfLikes">${videoData.likes}</div>
                    </div>
                    <div class="col-2">
                        <i onclick="sendDislike( &#34 ${videoData._id}&#34)" class="fa fa-thumbs-down col-12 fa-3x"></i>
                        <div class="col-12" id="numOfDislikes">${videoData.dislikes}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row pl-4">
        <h3 class=" pl-4 text-center  w-100">Comments:
            <div type="button" class="btn btn-primary" onclick="addComment( &#34 ${videoData._id}&#34 )">Add your comment!</div>
        </h3>
    </div>
    `;

    
    videoData.comments.forEach(element => {
        let replies = "";
        element.replies.forEach(element => 
        {       
            replies+= `
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-1">
                        <img src="./Resources/avatar.png" class="img-fluid" alt="Responsive image">
                    </div>
                    <div class="col-8 py-3 pl-0">
                        <p class="font-weight-bold d-inline">${element.author}</p> made a reply:
                        <br />
                    </div>
                </div>
                <div class="row">
                <div class="col-4"></div>
                <div class="border-left border-dark col-8 py-3 pl-0">
                    <p class="pl-3">
                    ${element.message}
                    </p>
                </div>
                </div>
            `
        }
        );


        temp += `
            <div class="container mx-2">
                <div class="row mx-4 my-2">
                    <div class="col-12">
                        <div class=" d-inline-block col-1 text-left">
                        <img src="./Resources/avatar.png" class="img-fluid" alt="Responsive image">
                        
                        </div>
                        <div class="d-inline-block p-0 col-10 text-left">
                            <h6>${element.author} made a comment:</h6>
                        </div>
                    </div>
                </div>
                <div class="row mx-4 my-2">
                    <div class=" d-inline-block col-1 text-left"></div>
                    <div class="border-left border-dark block px-3 text-left">
                        <p>${element.message}</p>
                        <br />
                        <div type="button" class="btn btn-primary" onclick="addReply( &#34 ${videoData._id}&#34 , &#34 ${element._id}&#34)">Reply</div>
                        <div type="button" class="btn btn-danger" onclick="deleteComment( &#34 ${videoData._id}&#34 , &#34 ${element._id}&#34)">Delete</div>
                    </div>
                    <div class="container">
                    ${replies}
                    </div>
                </div>
                
            </div>
        `;
    });


    document.getElementById("Display").innerHTML = temp;
    console.log(videoData);
}

function getVideoData()
{
    let vID = window.location.href.split('=')[1];
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://localhost:3000/watch?videoId='+vID, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send();
    displaySingleVideo(xmlHttp.responseText);

}

function increaseBrightness(what)
{
    document.getElementById(what).style.opacity = 0.4;
}

function decreaseBrightness(what)
{
    document.getElementById(what).style.opacity = 0.2;
}

function addReply(vID,cID)
{
    var who = prompt("Please enter your name", "testUser");
    var message = prompt("Now the message", "test message");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://localhost:3000/apiAddReply', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(
        {
            "vID": vID,
            "cID": cID,
            "author": who,
            "message": message
        }
    )); 
    
    console.log("sent new reply");
}

function deleteComment(vID, cID)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", 'http://localhost:3000/apiDeleteComment', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(
        {
            "vID": vID,
            "cID": cID
        }
    ));
    location.reload();
}

function addComment(vID)
{
    var who = prompt("Please enter your name", "testUser");
    var message = prompt("Now the message", "test message");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://localhost:3000/apiAddComment', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(
        {
            "vID": vID,
            "author": who,
            "message": message
        }
    ));
    location.reload();
}

function deleteVideo(vID)
{


    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", 'http://localhost:3000/apiDeleteVideo', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(
        {
            "vID": vID,
        }
    ));
    location.reload();
}