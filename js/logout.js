document.querySelector("#logout").addEventListener("click", (e) => {
    window.localStorage.clear();
    window.location.href = "login.html";
});