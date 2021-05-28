const base_url = "https://exchange-nodejs.herokuapp.com";

if(!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

//AUTO COMPLETE BEGIN
// document.querySelector("#recipient").addEventListener("keyup", () => {
//     let recipient = document.querySelector("#recipient").value;
//     console.log(recipient);
// });

primus = Primus.connect(base_url + "/js/primus.js", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

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
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            primus.write({
                "action": "addTransfer",
                "data": json
            });

            window.location.href = "index.html";
        } else {
            let feedback = document.querySelector(".form__alert");
            feedback.textContent = json.message;
            feedback.classList.remove("hidden");
        }
    }).catch(err => {
        console.log(err);
    })
});