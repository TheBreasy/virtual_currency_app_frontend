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

fetch("http://localhost:3000/users/" + localStorage.getItem('id'), {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
    // console.log(response.json());
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