const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const play = document.querySelector(".play");

const audio = document.querySelector(".audiofile");

const songname = document.querySelector(".song-name");
const image = document.querySelector(".img");
const progresscontainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const musiccontainer = document.querySelector(".music-container");

// song titles
const songs = ["hey", "summer", "ukulele"];

// keep track of song
let songindex = 2;

// initially load song detatils into dom
loadsong(songs[songindex]);

// update song details and img
function loadsong(song) {
  songname.innerText = song;
  audio.src = `music/${song}.mp3`;
  image.src = `images/${song}.jpg`;
}

// setting default volume

audio.volume = 0.1;

// play song
function playsong() {
  musiccontainer.classList.add("play");
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

// pause song
function pausesong() {
  musiccontainer.classList.remove("play");
  play.querySelector("i.fas").classList.add("fa-play");
  play.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// move to previous song
function prevsong() {
  songindex--;

  if (songindex < 0) {
    songindex = songs.length - 1;
  }
  loadsong(songs[songindex]);

  playsong();
}

// move to next song
function nextsong() {
  songindex++;

  if (songindex > songs.length - 1) {
    songindex = 0;
  }
  loadsong(songs[songindex]);

  playsong();
}

// update progress
function updateprogress(e) {
  const { currentTime, duration } = e.srcElement;
  //   console.log(currentTime, duration);

  const till = (currentTime / duration) * 100;
  progress.style.width = `${till}%`;
}

// set progress bar
function setprogress(e) {
  const width = this.clientWidth;
  const clickx = e.offsetX;

  const duration = audio.duration;

  audio.currentTime = (clickx / width) * duration;
}

// play button event listener
play.addEventListener("click", () => {
  const isplaying = musiccontainer.classList.contains("play");
  if (isplaying) {
    pausesong();
  } else {
    playsong();
  }
});

// change song
prev.addEventListener("click", prevsong);
next.addEventListener("click", nextsong);

// progress update
audio.addEventListener("timeupdate", updateprogress);
progresscontainer.addEventListener("click", setprogress);

// song ends
audio.addEventListener("ended", nextsong);
