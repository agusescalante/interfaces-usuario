let last_link = null;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#messages").addEventListener("click", () => {

        toggle_loading_screen();
        deselect_navbar_tab();
        clear_container();

        setTimeout(() => {
            toggle_loading_screen();
            load_chats();
        }, 1000);
    });

    document.querySelector("#search").addEventListener("click", () => {
        clear_container();
        load_search();
    });

    document.querySelector("#home").addEventListener("click", () => {


        toggle_loading_screen();
        deselect_navbar_tab();
        clear_container();

        setTimeout(() => {
            toggle_loading_screen();
            load_home();
        }, 1000);

    });

    document.querySelector("#profile").addEventListener("click", () => {

        toggle_loading_screen();
        deselect_navbar_tab();
        clear_container();

        setTimeout(() => {
            toggle_loading_screen();
            load_profile();
        }, 1000);

    });

    document.querySelector("#add-post").addEventListener("click", () => {

        toggle_loading_screen();
        deselect_navbar_tab();
        clear_container();

        setTimeout(() => {
            toggle_loading_screen();
            load_add_post();
        }, 1000);

    });

    document.querySelector("#notifications").addEventListener("click", () => {

        toggle_loading_screen();
        deselect_navbar_tab();
        clear_container();

        setTimeout(() => {
            toggle_loading_screen();
            load_notifications();
        }, 1000);

    });
});

function clear_container() {
    document.querySelector(".h-header").innerHTML = "";
    document.querySelector(".container").innerHTML = "";
}

function load_notifications() {
    load_module("notification-module.html");
    attach_css_link("css/notification-module.css");
    document.title = "Notificaciones";
    select_navbar_tab(2);
}

function load_search() {
    load_module("search-module.html");
    attach_css_link("css/search-module.css");
    document.title = "Buscar";
    deselect_navbar_tab();
}

function load_add_post() {
    load_module("add-post-module.html");
    attach_css_link("css/add-post.css");
    document.title = "Crear publicación";
    deselect_navbar_tab();
}

function load_home() {
    load_module("home-module.html");
    remove_last_css_link();
    last_link = null;
    document.title = "Home";
    select_navbar_tab(1);
}

function load_profile() {
    load_module("profile-module.html");
    attach_css_link("css/profile-module.css");
    document.title = "@marce999 Profile";
    select_navbar_tab(4);
}

function load_chats() {
    load_module("chats-module.html");
    attach_css_link("css/chats-module.css");
    document.title = "Chats";
    select_navbar_tab(3);
}

// Carga el fragmento de html pasado por parametro
function load_module(link) {
    clear_container();

    fetch("templates/" + link)
        .then(function(response) {
            return response.text()
        })
        .then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");

            let container = doc.body.querySelector(".container");
            document.querySelector(".container").innerHTML = container.innerHTML;

            let header = doc.body.querySelector(".h-header");
            document.querySelector(".h-header").innerHTML = header.innerHTML;
        })
        .catch(function(err) {
            console.log('Failed to fetch page: ', err);
        });
}

// Añade el fragmento de css por la ruta pasada por parametro
function attach_css_link(css_link) {
    remove_last_css_link();
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = css_link;
    last_link = link;
    head.appendChild(link);
}

function remove_last_css_link() {
    if (last_link != null) {
        let head = document.getElementsByTagName('HEAD')[0];
        head.removeChild(last_link);
    }
}

function select_navbar_tab(number) {
    deselect_navbar_tab();

    switch (number) {
        case 1:
            document.querySelector("#home").classList.add("icon-selected");
            break;
        case 2:
            document.querySelector("#notifications").classList.add("icon-selected");
            break;
        case 3:
            document.querySelector("#messages").classList.add("icon-selected");
            break;
        case 4:
            document.querySelector("#profile").classList.add("icon-selected");
            break;
    }
}

function deselect_navbar_tab() {
    let div = document.querySelector(".icon-selected");
    if (div != null) {
        div.classList.remove("icon-selected");
    }
}

function toggle_loading_screen() {
    let loading_anim = document.querySelector(".dual-loading-screen");

    if (loading_anim.classList.contains("loading-stopped")) {
        loading_anim.classList.remove("loading-stopped");
        loading_anim.classList.add("loading-started");
    } else {
        loading_anim.classList.add("loading-stopped");
        loading_anim.classList.remove("loading-started");
    }
}