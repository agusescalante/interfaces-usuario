let avatar = document.getElementById("avatar");
let rock = document.getElementById("rock");
let score = document.getElementById("score");
let keyDown = false;

function jump() {
    avatar.classList.add("jump-animation");
    setTimeout(() =>
      avatar.classList.remove("jump-animation"), 500); 
  }

    avatar.classList.add("run");

  window.addEventListener('keydown', (event) => {
      keyDown = true;
  });

  window.addEventListener("keyup",function(){
    keyDown = false;
    avatar.classList.add("run");

  });

  setInterval(()=>{
    if(keyDown){
        avatar.classList.remove("run");
        jump();
    }
  },50);

  //test


