document.addEventListener("DOMContentLoaded", () => {

    // smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    let scroll_y;
    document.addEventListener("scroll", () => {
        scroll_y = window.scrollY;
        console.log(scroll_y);
        let start = document.querySelector(".text").offsetTop;
        if ((scroll_y >= start - 500) && (scroll_y < 700)) {
            if (scroll_y < 530) {
                document.querySelector(".left1").style.left = scroll_y - 500 + "px";
            } else {
                document.querySelector(".left2").style.left = (scroll_y - 650) + "px";
            }
        }
    });
});