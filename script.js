'use strict';
let a = Math.trunc(Math.random() * 20) + 1;
let i = 20;

document.querySelector('.again').addEventListener('click', () => {
  i = 20;
  a = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = 20;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
});
//debouncing: execute when conccurent delay between events is greater than delay
// const debounce = (myFunc, delay) => {
//   let inDebounce;
//   return function () {
//     clearTimeout(inDebounce);
//     inDebounce = setTimeout(() => myFunc(), delay);
//   };
// };

//throttling: execute once, and don't let it execute till throttle period is over
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func();
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
document.querySelector('.check').addEventListener(
  'click',
  throttle(() => clickCheck(), 2000)
);

function clickCheck() {
  console.log('click API called');
  const guess = Number(document.querySelector('.guess').value);
  if (document.querySelector('.score').textContent > 1) {
    if (!guess) {
      document.querySelector('.message').textContent = 'Enter Valid Number!';
    } else if (guess === a) {
      document.querySelector('.message').textContent = 'Voila! This is it.';
      document.querySelector('body').style.backgroundColor = '#60B347';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.number').textContent = a;

      if (
        document.querySelector('.score').textContent >
        document.querySelector('.highscore').textContent
      ) {
        document.querySelector(
          '.highscore'
        ).textContent = document.querySelector('.score').textContent;
      }
    } else if (guess > a) {
      document.querySelector('.message').textContent = 'Guess too high!';
      i--;
      document.querySelector('.score').textContent = i;
    } else {
      document.querySelector('.message').textContent = 'Guess too low!';
      i--;
      document.querySelector('.score').textContent = i;
    }
  } else
    document.querySelector('.message').textContent = 'You lost the game!💥';
}
