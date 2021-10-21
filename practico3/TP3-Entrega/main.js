let avatar = document.getElementById("avatar");
let rock = document.getElementById("rock");
let score = document.getElementById("score");
let tecla = false;
let imgJump = 'url(images/avatarBetty/image-jump.png)';
let imgRun = 'url(images/avatarBetty/avatarRun.png)';
let imgDown = 'url(images/avatarBetty/down.png)';
//38 arriba
//40 abajo
//git credenciales

avatar.style.backgroundImage = imgRun;
   avatar.classList.add("run");

  window.addEventListener('keydown', (e) => {
    tecla = e.keyCode;
   // avatar.classList.remove("jump-animation");
  });

  window.addEventListener("keyup",function(){
    tecla = null;
    avatar.classList.remove("down-animation");
     avatar.classList.add("run");
    avatar.style.backgroundImage = imgRun;

  });
      setInterval(()=>{
        if(tecla === 38){
          avatar.style.backgroundImage = imgJump;
          avatar.classList.remove("run");
          avatar.classList.add("jump-animation");
        }
        else if(tecla == 40){
          avatar.style.backgroundImage = imgDown;
          avatar.classList.remove("run");
          avatar.classList.add("down-animation");
        }
      },70);

  //test


