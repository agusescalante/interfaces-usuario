let buttons = document.querySelectorAll(".reaction-like-button");

let counter = document.querySelector(".reaction-count");

let popup = document.querySelector("#like-popup");

let like = document.querySelectorAll('.liked');
like.forEach(button => {
       button.addEventListener("click", () => {
        if(button.style.fill == 'red'){
            button.style.fill = '#2B2B2B';
        }else{
            button.style.fill = 'red';
            //counter.innerHTML=12;
        }
        
       })});
        


function toggle_popup() {
    let popup = document.querySelector("#like-popup");

    if (popup.classList.contains("popup-hidden")) {
        popup.classList.remove("popup-hidden");
        popup.classList.add("popup-shown");
    } else {
        popup.classList.remove("popup-shown");
        popup.classList.add("popup-hidden");
    }
}

function is_popup_visible() {
    if (document.querySelector("#like-popup").classList.contains("popup-hidden")) {
        return false;
    } else return true;
}