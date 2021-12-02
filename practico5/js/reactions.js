let buttons = document.querySelectorAll(".reaction-like-button");

let popup = document.querySelector("#like-popup");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        if (!is_popup_visible()) {
            toggle_popup();
        }

        let popup_rect = popup.getBoundingClientRect();
        let rect = button.getBoundingClientRect();
        let bodyRect = document.body.getBoundingClientRect();

        let top_offset = rect.top - bodyRect.top;
        let left_offset = rect.left - bodyRect.left;

        popup.style.left = left_offset - popup_rect.width / 2 + 15 + "px";
        popup.style.top = top_offset - popup_rect.height + "px";


        // let like = document.querySelector("#popup-like");
        let dislike = document.querySelector("#popup-dislike");

        // like.addEventListener("click", () => {

        // });

        dislike.addEventListener("click", show_dislike);

        function show_dislike() {
            // button.innerHTML = like.innerHTML;
            // button.style.width = 30 + "px";
            toggle_popup();
            // like.removeEventListener("click", show_like);
        }

        //si hizo click afuera lo esconde
        // setTimeout(() => {
        //     document.addEventListener('click', function(event) {
        //         let isClickInsideElement = popup.contains(event.target);
        //         if (!isClickInsideElement) {
        //             toggle_popup();
        //         }
        //     });
        // }, 500);
    });
});

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