fetch("http://localhost:3000/api/v1/transfer/history", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
}).then(data => {
    console.log(data);
    console.log(data.data.transfers[0]['sender']);
    console.log(data.data.transfers[0]['recipient']);
    for(let i = 0; i < data.data.transfers.length; i++) {
        let sender = data.data.transfers[i]['sender'];
        let recipient = data.data.transfers[i]['recipient'];
            let getHistory =
                `<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                    <div class="d-flex align-items-center">
<!--                        <img class="card&#45;&#45;icon-ms" src="images/outgoing.svg" alt="outgoing">-->
                        <span class="font-bold color-grey">${sender} ▶ ${recipient}</span>
                    </div>
                    <span class="color-blue">₡${data.data.transfers[i]['amount']}</span>
                </div>`
            document.querySelector(".history").insertAdjacentHTML('afterend', getHistory);
    }
}).catch(err => {
    console.log(err);
})