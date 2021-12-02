document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".register-crear-cuenta").addEventListener("click", (e) => {
        e.preventDefault();

        let inputs_container = document.querySelector(".register-input");
        let inputs = inputs_container.querySelectorAll("input");

        let valid = true;

        inputs.forEach(input => {
            if (input.value.length == 0) {
                valid = false;
            }
        });

        if (valid) {
            let password1 = document.querySelector("#password1").value;
            let password2 = document.querySelector("#password2").value;

            if (password1 == password2) {
                window.location.href = "../home.html";
            } else {
                document.querySelector(".register-error").style.visibility = "visible";
                document.querySelector(".register-error").innerHTML = "Las contraseñas no coinciden";
            }
        } else {
            document.querySelector(".register-error").style.visibility = "visible";
            document.querySelector(".register-error").innerHTML = "Complete todos los campos";
        }
    });

});