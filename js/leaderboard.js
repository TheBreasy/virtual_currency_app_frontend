const base_url = "https://exchange-nodejs.herokuapp.com";

if(!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

fetch(base_url + "/api/v1/leaderboard", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
}).then(data => {
    for(let i = 0; i <= data.users.length-1; i++) {
        let getUsers =
            `<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                <div class="font-bold color-grey">
                    <span>${i+1}.</span>
                    <span>${data.users[i]['firstname']}</span>
                </div>
                <span class="color-blue">${data.users[i]['coins']}</span>
            </div>`;

        document.querySelector(".leaderboard").insertAdjacentHTML('beforeend', getUsers);
    }
}).catch(err => {
    console.log(err);
})