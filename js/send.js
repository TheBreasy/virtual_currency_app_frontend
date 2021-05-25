fetch("http://localhost:3000/api/v1/transfers", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    window.location.href = "login.html";
});

//AUTO COMPLETE BEGIN
// document.querySelector("#recipient").addEventListener("keyup", () => {
//     let recipient = document.querySelector("#recipient").value;
//     console.log(recipient);
// });

document.querySelector("#send").addEventListener("click", () => {
    let recipient = document.querySelector("#recipient").value;
    let amount = document.querySelector("#amount").value;
    let reason = document.querySelector("#reason").value;
    let message = document.querySelector("#message").value;
    fetch('http://localhost:3000/api/v1/transfers', {
        method: "post",
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body:JSON.stringify({
            "sender": localStorage.getItem('id'),
            "recipient": recipient,
            "amount": amount,
            "reason": reason,
            "message": message
        })

    }).then(response => {
        window.location.href = "index.html";
        return response.json();
    })
});