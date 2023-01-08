const wrapper = document.getElementById("wrapper");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const uniqueRand = (min, max, prev) => {
  let next = prev;

  while (prev == next) next = rand(min, max);

  return next;
};

const combinations = [
  {
    configuration: 1,
    roundness: 1,
  },
  {
    configuration: 1,
    roundness: 2,
  },
  {
    configuration: 1,
    roundness: 3,
  },
  {
    configuration: 1,
    roundness: 4,
  },
  {
    configuration: 2,
    roundness: 1,
  },
  {
    configuration: 2,
    roundness: 2,
  },
];

let prev = 0;

const startAnimation = () => {
  timer = setInterval(() => {
    const index = uniqueRand(0, combinations.length - 1, prev);
    combination = combinations[index];
    wrapper.dataset.configuration = combination.configuration;
    wrapper.dataset.roundness = combination.roundness;

    prev = index;
  }, 3000);
};

startAnimation();

wrapper.onmouseover = () => {
  clearInterval(timer);
};

wrapper.onmouseleave = () => {
  startAnimation();
};

// play audio on hover over the tiles
const audios = document.querySelectorAll("audio");
const shapes = document.querySelectorAll(".shape");

const playAudio = (index) => {
  if (!audios[index].paused) {
    audios[index].currentTime = 0;
  }
  audios[index].play();
};

shapes.forEach((shape, index) => {
  shape.onmouseover = () => playAudio(index);
  shape.onclick = () => playAudio(index);
});
