const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const audios = frame.querySelectorAll("audio");
const deg = 45;
let num = 0;
let i = 0;
lists.forEach((list) => {
  const pic = list.querySelector(".pic");
  list.style.transform = `rotate(${deg * i}deg)  translateY(-100vh)`;
  pic.style.backgroundImage = `url("./img/member${i + 1}.jpg")`;
  i++;
  const pause = list.querySelector("ul li:nth-child(1)");
  const play = list.querySelector("ul li:nth-child(2)");
  const load = list.querySelector("ul li:nth-child(3)");
  pause.addEventListener("click", (e) => {
    const article = e.target.closest("article");
    const picElement = article.querySelector(".pic");
    const audioElement = article.querySelector("audio");
    // 애니메이션 멈춤
    picElement.classList.remove("on");
    // 오디오 정지
    audioElement.pause(); // classList 대신 pause() 메서드를 사용
  });
  play.addEventListener("click", (e) => {
    const article = e.target.closest("article");
    const picElement = article.querySelector(".pic");
    const audioElement = article.querySelector("audio");
    // 애니메이션 시작
    picElement.classList.add("on");
    // 오디오 재생
    audioElement.play(); // classList 대신 play() 메서드를 사용
  });
  load.addEventListener("click", (e) => {
    const article = e.target.closest("article");
    const picElement = article.querySelector(".pic");
    const audioElement = article.querySelector("audio"); // .audio 대신 정확한 audio 요소 선택
    // 애니메이션 시작
    picElement.classList.add("on");
    // 오디오 로드 및 재생
    audioElement.load(); // 오디오를 다시 로드
    audioElement.play(); // 오디오 재생
  });
});

//음원 정지 후 리셋 및 이미지 stop
const initMusic = () => {
  for (let audio of audios) {
    audio.pause();
    audio.load();
    audio.parentElement.previousElementSibling.classList.remove("on");
  }
};
initMusic();
let active = 0;
const len = lists.length - 1;

//
const activation = (index, lists) => {
  for (let list of lists) {
    list.classList.remove("on");
  }
  lists[index].classList.add("on");
};
prev.addEventListener("click", () => {
  num++;
  frame.style.transform = `rotate(${num * deg}deg)`;
  active === 0 ? (active = len) : active--;
  activation(active, lists);
});
next.addEventListener("click", () => {
  initMusic();
  num--;
  frame.style.transform = `rotate(${num * deg}deg)`;
  active === len ? (active = 0) : active++;
  activation(active, lists);
  console.log(active);
});
