/* const btnLogin = */ document.querySelector("#login").addEventListener("click", () => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch('http://localhost:3000/users/login', {
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
            let nickname = json.data.nickname;
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);
            localStorage.setItem("nickname", nickname);
            window.location.href = "index.html";
        } else {
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Login failed buddy";
            feedback.classList.remove('hidden');
        }
    })
});