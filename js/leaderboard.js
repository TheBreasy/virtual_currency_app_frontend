fetch("http://localhost:3000/api/v1/leaderboard", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(response => {
    return response.json();
    console.log(response.json());
}).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})