<<<<<<< HEAD
const btnSignup = document.querySelector(".signup button").addEventListener("click", (e) => {
    let username = document.querySelector('#email').value;
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let password = document.querySelector('#password').value;
=======
/* const btnSignup = */ document.querySelector(".signup button").addEventListener("click", () => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
>>>>>>> main

    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
<<<<<<< HEAD
            "username":username,
=======
            "username": username,
>>>>>>> main
            "firstname": firstname,
            "lastname": lastname,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Sign up complete!";
            feedback.classList.remove('hidden');

            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "login.html";
        }
    })
});