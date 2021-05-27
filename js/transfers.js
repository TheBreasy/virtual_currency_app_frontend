const base_url = "https://exchange-nodejs.herokuapp.com";

fetch(base_url + "/api/v1/transfers", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
}).then(data => {
    for(let i = 0; i < data.data.transfers.length; i++) {
        let sender = data.data.transfers[i]['sender'];
        let nickname = data.user['nickname'];
        if(sender === nickname) {
            let getExpenses =
                `<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                    <div class="d-flex align-items-center">
                        <img class="card--icon-ms" src="images/outgoing.svg" alt="outgoing">
                        <span class="font-bold color-grey pl-1">${data.data.transfers[i]['recipient']}</span>
                    </div>
                    <span class="color-red">₡${data.data.transfers[i]['amount']}</span>
                </div>`
            document.querySelector(".transfers").insertAdjacentHTML('afterend', getExpenses);
        }
        let recipient = data.data.transfers[i]['recipient'];
        if(recipient === nickname) {
            let getIncome =
                `<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                    <div class="d-flex align-items-center">
                        <img class="card--icon-ms" src="images/incoming.svg" alt="incoming">
                        <span class="font-bold color-grey pl-1">${data.data.transfers[i]['sender']}</span>
                    </div>
                    <span class="color-green">₡${data.data.transfers[i]['amount']}</span>
                </div>`
            document.querySelector(".transfers").insertAdjacentHTML('afterend', getIncome);
        }
    }
}).catch(err => {
    console.log(err);
})