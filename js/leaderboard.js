fetch("http://localhost:3000/api/v1/leaderboard", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
}).then(data => {
    for(let i = data.users.length-1; i >= 0; i--) {
        let getUsers =
            `<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                <div class="font-bold color-grey">
                    <span>${i+1}.</span>
                    <span>${data.users[i]['firstname']}</span>
                </div>
                <span class="color-blue">${data.users[i]['coins']}</span>
            </div>`;

        document.querySelector(".leaderboard").insertAdjacentHTML('afterend', getUsers);
    }
}).catch(err => {
    console.log(err);
})