const base_url = "https://exchange-nodejs.herokuapp.com";

if(!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

primus = Primus.connect("/", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', (json) => {
    if(json.action === "updateLeaderboard") {
        updateLeaderboard(json.data);
    }
});

let updateLeaderboard = (data) => {
    document.querySelector(".leaderboard").innerHTML = "";
    for(let i = 0; i <= data.users.length-1; i++) {
        let getUsers =
            `<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                <div class="font-bold color-grey">
                    <span>${i+1}.</span>
                    <span>${data.users[i]['nickname']}</span>
                </div>
                <span class="color-blue">${data.users[i]['coins']}</span>
            </div>`;

        document.querySelector(".leaderboard").insertAdjacentHTML('beforeend', getUsers);
    }
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
    primus.write({
        "action": "updateLeaderboard",
        "data": data
    });
}).catch(err => {
    console.log(err);
})