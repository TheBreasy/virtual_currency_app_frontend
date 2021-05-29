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