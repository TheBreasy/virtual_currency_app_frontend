const base_url = "https://exchange-nodejs.herokuapp.com";

if(!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

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

fetch(base_url + "/api/v1/transfers/", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
}).then(data => {
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

}).catch(err => {
    console.log(err);
})