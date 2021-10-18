const avatar = document.getElementById("avatar");
const rock = document.getElementById("rock");
const score = document.getElementById("score");

function jump() {
  avatar.classList.add("jump-animation");
  setTimeout(() =>
    avatar.classList.remove("jump-animation"), 500);
}

document.addEventListener('keypress', (event) => {
  if (!avatar.classList.contains('jump-animation')) {
    jump();
  }
})

setInterval(() => {
  const avatarTop = parseInt(window.getComputedStyle(avatar)
    .getPropertyValue('top'));
  const rockLeft = parseInt(window.getComputedStyle(rock)
    .getPropertyValue('left'));
 // score.innerText++;

  if (rockLeft < 0) {
    rock.style.display = 'none';
  } else {
    rock.style.display = ''
  }

  if (rockLeft < 50 && rockLeft > 0 && avatarTop > 350) {
    // alert("You got a score of: " + score.innerText +
    //   "\n\nPlay again?");
    // location.reload();
  }
}, 50);
