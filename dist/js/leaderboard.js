const base_url="https://exchange-nodejs.herokuapp.com";localStorage.getItem("token")||(window.location.href="login.html"),primus=Primus.connect(base_url+"/js/primus.js",{reconnect:{max:1/0,min:500,retries:10}}),primus.on("data",e=>{"updateLeaderboard"===e.action&&updateLeaderboard(e.data)});let updateLeaderboard=a=>{document.querySelector(".leaderboard").innerHTML="";for(let e=0;e<=a.users.length-1;e++){var t=`<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                <div class="font-bold color-grey">
                    <span>${e+1}.</span>
                    <span>${a.users[e].nickname}</span>
                </div>
                <span class="color-blue">${a.users[e].coins}</span>
            </div>`;document.querySelector(".leaderboard").insertAdjacentHTML("beforeend",t)}};fetch(base_url+"/api/v1/leaderboard",{method:"get",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(e=>{primus.write({action:"updateLeaderboard",data:e})}).catch(e=>{console.log(e)});