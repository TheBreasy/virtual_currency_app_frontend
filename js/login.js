<<<<<<< HEAD
const btnLogin = document.querySelector(".login button").addEventListener("click", (e) => {
=======
/* const btnLogin = */ document.querySelector(".login button").addEventListener("click", () => {
>>>>>>> main
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch('http://localhost:3000/users/login', {
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
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html";
        } else {
            let feedback = document.querySelector(".alert");
<<<<<<< HEAD
            feedback.textContent = "Login failed buddy.";
=======
            feedback.textContent = "Login failed buddy";
>>>>>>> main
            feedback.classList.remove('hidden');
        }
    })
});