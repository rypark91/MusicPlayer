let playList = [{
    name: "Song1",
    artist: "Artist1",
    path: "songs/NeonLaserHorizon.mp3",
    img: "pic1.png"
},
{
    name: "Song2",
    artist: "Artist2",
    path: "songs/Pump.mp3",
    img: "pic2.jpg"
},
{
    name: "Song3",
    artist: "Artist3",
    path: "songs/SpaceFighterLoop.mp3",
    img: "pic3.png"
}
];

let song = document.querySelector("#song");
let artist = document.querySelector("#artist");
let playPauseButton = document.querySelector("#playpause");

let nextButton = document.querySelector("#next");
let prevButton = document.querySelector("#prev");
let time = document.querySelector("#time");
let timeSlide = document.querySelector("#timeSlide");
let pic = document.querySelector("#pic");

let placeHolder;
var isPlaying;
var track;
var intervalId;

playPauseButton.addEventListener("click", function(){
    if(isPlaying){

        placeHolder.pause();
        isPlaying = false;
        playPauseButton.innerHTML = `<i class="bi bi-play"></i>`;
    }
    else{
        placeHolder.play();
        timeSlide.max = placeHolder.duration.toString();
        isPlaying = true;
        playPauseButton.innerHTML = `<i class="bi bi-pause"></i>`;
    }
    
});
nextButton.addEventListener("click", function(){
    //makes sure the user doesn't go too far forward
    if(track !== 2){
        placeHolder.pause();
        track++;
        placeHolder = new Audio(playList[track].path);
        timeSlide.value = "0";
        timeSlide.max = placeHolder.duration.toString();
        placeHolder.onloadedmetadata = function(){
            song.innerText = playList[track].name;
            artist.innerText = playList[track].artist;
            pic.src = playList[track].img;
            time.innerText = `${formatTime(Math.floor(timeSlide.value))}/${formatTime(Math.floor(placeHolder.duration))}`;
            placeHolder.currentTime = timeSlide.value;
            
        };
        if(isPlaying){
            setTimeout(function(){
                placeHolder.play();
            },300);
                  
        }
    }
 
});
prevButton.addEventListener("click", function(){
    //makes sure the user doesn't go too far back
    if(track !== 0){
        placeHolder.pause();
        track--;
        placeHolder = new Audio(playList[track].path);
        timeSlide.value = "0";
        timeSlide.max = placeHolder.duration.toString();
        
        placeHolder.onloadedmetadata = function(){
            song.innerText = playList[track].name;
            artist.innerText = playList[track].artist;
            pic.src = playList[track].img;
        
            time.innerText = `${formatTime(Math.floor(timeSlide.value))}/${formatTime(Math.floor(placeHolder.duration))}`;
            placeHolder.currentTime = timeSlide.value;
            
        };

        if(isPlaying){
            setTimeout(function(){
                placeHolder.play();
            },300);      
        }
    }
    
});
timeSlide.addEventListener("input", function(){
    clearInterval(intervalId);
    time.innerText = `${formatTime(Math.floor(timeSlide.value))}/${formatTime(Math.floor(placeHolder.duration))}`;
    
});
timeSlide.addEventListener("change", function(){
    time.innerText = `${formatTime(Math.floor(timeSlide.value))}/${formatTime(Math.floor(placeHolder.duration))}`;
    placeHolder.currentTime = timeSlide.value;
    intervalId = setInterval(updateFlowingTimeline,100);
});

function formatTime(seconds){

    var tenmin = Math.floor((seconds / 60) / 10);
    var onemin = Math.floor((seconds / 60) % 10);
    var tensec = Math.floor((seconds % 60) / 10);
    var onesec = Math.floor(seconds % 60) % 10;
    return `${tenmin}${onemin}:${tensec}${onesec}`;
    
}

function updateFlowingTimeline(){
    //updates the slider
    time.innerText = `${formatTime(Math.floor(placeHolder.currentTime))}/${formatTime(Math.floor(placeHolder.duration))}`;
    timeSlide.value = placeHolder.currentTime.toString(); 
}
function init(){
    //sets up initial data
    placeHolder = new Audio(playList[0].path);
    time.innerText = `00:00/02:58`;
    isPlaying = false;
    track = 0;

    
    
    placeHolder.onloadedmetadata = function(){
        //sets up song data
        song.innerText = playList[0].name;
        artist.innerText = playList[0].artist;
        pic.src = playList[0].img;
    
        timeSlide.value = "0";
        timeSlide.max = placeHolder.duration.toString();
    };
    
    intervalId = setInterval(updateFlowingTimeline,100);


}
init();


