const base_url = "https://exchange-nodejs.herokuapp.com";

/* const btnLogin = */ document.querySelector("#login").addEventListener("click", () => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch(base_url + "/users/login", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            let token = json.data.token;
            let id = json.data.id;
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);
            window.location.href = "index.html";
        } else {
            let feedback = document.querySelector(".form__alert");
            feedback.textContent = json.message;
            feedback.classList.remove("hidden");
        }
    })
});