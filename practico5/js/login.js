document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".register-crear-cuenta").addEventListener("click", () => {

        let container = document.querySelector(".register-input");
        let inputs = container.querySelectorAll("input");
        console.log(inputs);

        let valid = true;

        inputs.forEach(input => {
            if (input.value.length == 0) {
                valid = false;
            }
        });

        if (valid) {
            window.location.href = "../home.html";
        } else {
            document.querySelector(".error-msg").style.visibility = "visible";
        }

    });
});