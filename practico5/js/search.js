let already_used = false;


document.addEventListener("click", () => {
    document.querySelector(".search-bar-input").addEventListener("input", () => {
        setTimeout(() => {
            load_search(document.querySelector(".search-bar-input").value);
        }, 1000);
    });



    function load_search(value) {
        if (value == "") {
            document.querySelector(".search-results").style.visibility = "hidden";
        } else {
            if (!already_used) {
                document.querySelector(".search-results").style.visibility = "visible";
                let names = document.querySelectorAll(".search-nickname");
                names.forEach(name => {
                    let random = Math.floor(Math.random() * 10);
                    name.innerHTML = value + "_" + random;
                });
                already_used = true;

                setTimeout(() => {
                    already_used = false;
                }, 1000);
            }
        }
    }
});