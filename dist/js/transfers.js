const base_url="https://exchange-nodejs.herokuapp.com";localStorage.getItem("token")||(window.location.href="login.html"),fetch(base_url+"/api/v1/transfers",{method:"get",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(t=>{for(let e=0;e<t.data.transfers.length;e++){var a=t.data.transfers[e].sender,n=t.user.nickname;a===n&&(a=`<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                    <div class="d-flex align-items-center">
                        <img class="card__icon--s" src="images/outgoing.svg" alt="outgoing">
                        <span class="font-bold color-grey pl-1">${t.data.transfers[e].recipient}</span>
                    </div>
                    <span class="color-red">₡${t.data.transfers[e].amount}</span>
                </div>`,document.querySelector(".transfers").insertAdjacentHTML("afterend",a)),t.data.transfers[e].recipient===n&&(n=`<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                    <div class="d-flex align-items-center">
                        <img class="card__icon--s" src="images/incoming.svg" alt="incoming">
                        <span class="font-bold color-grey pl-1">${t.data.transfers[e].sender}</span>
                    </div>
                    <span class="color-green">₡${t.data.transfers[e].amount}</span>
                </div>`,document.querySelector(".transfers").insertAdjacentHTML("afterend",n))}}).catch(e=>{console.log(e)});