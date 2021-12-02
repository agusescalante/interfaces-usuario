document.addEventListener("DOMContentLoaded", () => {

    let as = document.querySelectorAll("a");

    as.forEach(a => {
        a.addEventListener("click", (e) => {
            e.preventDefault();

            document.querySelector(".container").innerHTML = "";

            let loading_screen = document.querySelector(".dual-loading-screen");
            loading_screen.classList.remove("loading-stopped");
            loading_screen.classList.add("loading-started");

            setTimeout(() => {
                window.location.href = a.href;
            }, 600);

        });
    });
});