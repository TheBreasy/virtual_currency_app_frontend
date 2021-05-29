const base_url = "https://exchange-nodejs.herokuapp.com";

if(!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

const recipient = document.querySelector('#recipient');
const autocomplete = document.querySelector('#autocomplete');

const searchName = async (searchText) => {
    let res = await fetch(base_url + "/users/", {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const json = await res.json();
    let users = json.users;

    let matches = users.filter(user =>{
        const regex = new RegExp(`^${searchText}`, 'gi');
        return user.nickname.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        document.querySelector('#autocomplete').innerHTML = "";
    }

    outputHtml(matches);
};

const outputHtml = matches => {
        if (matches.length>0){
            // matches.forEach(match =>{
                const html = matches.map(match => `
                    <div class="pt-1">
                        <a class="color-blue autofill">${match.nickname}</a>
                    </div>
                `).join('');
                autocomplete.innerHTML = html;

                console.log(matches);
                console.log(html);

        //         document.querySelector('.autofill').addEventListener("click", function (e){
        //             console.log('clicked');
        //             e.preventDefault();
        //             document.querySelector('#recipient').value = document.querySelector('.autofill').innerHTML;
        //     })
        // })

            document.querySelectorAll('.autofill').forEach(item => {
                item.addEventListener('click', event => {
                    console.log('clicked');
                    event.preventDefault();
                    document.querySelector('#recipient').value = document.querySelector('.autofill').innerHTML;
                })
            })
    }
}

recipient.addEventListener('input', () =>  searchName(recipient.value));

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