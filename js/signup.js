/* const btnSignup = */ document.querySelector("#signup").addEventListener("click", () => {
    let email = document.querySelector('#email').value;
    let nickname = document.querySelector('#nickname').value;
    let password = document.querySelector('#password').value;
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;

    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": email,
            "nickname": nickname,
            "firstname": firstname,
            "lastname": lastname,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "login.html";
        }
    })
});