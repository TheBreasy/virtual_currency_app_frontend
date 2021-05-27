const base_url = "https://exchange-nodejs.herokuapp.com";

if(!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

//AUTO COMPLETE BEGIN
// document.querySelector("#recipient").addEventListener("keyup", () => {
//     let recipient = document.querySelector("#recipient").value;
//     console.log(recipient);
// });

document.querySelector("#send").addEventListener("click", () => {
    let recipient = document.querySelector("#recipient").value;
    let amount = parseInt(document.querySelector("#amount").value);
    let reason = document.querySelector("#reason").value;
    let message = document.querySelector("#message").value;
    fetch(base_url + "/api/v1/transfers", {
        method: "post",
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body:JSON.stringify({
            "recipient": recipient,
            "amount": amount,
            "reason": reason,
            "message": message
        })

    }).then(response => {
        window.location.href = "index.html";
        return response.json();
    }).catch(err => {
        console.log(err);
    })
});