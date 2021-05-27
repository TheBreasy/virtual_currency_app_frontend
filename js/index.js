const base_url = "https://exchange-nodejs.herokuapp.com";

fetch(base_url + "/api/v1/transfers", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).catch(err => {
    window.location.href = "login.html";
});