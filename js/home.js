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

fetch(base_url + "/users/" + localStorage.getItem('id'), {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
}).then(data => {
    let getAmount =
        `<img class="card--icon-m mb-1" src="images/coins.svg" alt="coins">
         <p class="mb-1 color-grey font-bold font-size-l">${data.coins}</p>
         <span class="d-block uppercase font-size-xs">coins</span>`;
    document.querySelector(".amount").insertAdjacentHTML('afterbegin', getAmount);

    let getWelcome =
        `<div class="py-1">
            <h2 class="text-center uppercase color-blue font-bold">Welcome, ${data.firstname}</h2>
        </div>`;
    document.querySelector("header").insertAdjacentHTML('afterend', getWelcome);
}).catch(err => {
    console.log(err);
})

primus.on('data', (json) => {
    if(json.action === "addTransfer") {
        updateNotifications(json.data);
    }
});

let updateNotifications = (data) => {
    console.log(data);
    document.querySelector(".notifications").innerHTML = "";
    for(let i = 0; i <= data.data.transfers.length; i++) {
        let nickname = data.user['nickname'];
        let recipient = data.data.transfers[i]['recipient'];
        if(recipient === nickname) {
            let getNotification =
                `<div class="card d-flex align-items-center mt-1 px-1 py-half">
                    <img class="card--icon-s" src="images/notification.svg" alt="notification">
                    <span class="pl-1">Received ₡${data.data.transfers[i]['amount']} from ${data.data.transfers[i]['sender']}</span>
                </div>`

            document.querySelector(".notifications").insertAdjacentHTML('afterend', getNotification);
        }
    }
}

fetch(base_url + "/api/v1/transfers/", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
}).then(data => {
    updateNotifications(data);

}).catch(err => {
    console.log(err);
})