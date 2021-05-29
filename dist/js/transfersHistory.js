const base_url="https://exchange-nodejs.herokuapp.com";localStorage.getItem("token")||(window.location.href="login.html"),fetch(base_url+"/api/v1/transfer/history",{method:"get",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>e.json()).then(t=>{for(let e=0;e<t.data.transfers.length;e++){var a=`<div class="d-flex justify-content-between align-items-center mt-1 px-1 py-half">
                    <div class="d-flex align-items-center">
                        <span class="font-bold color-grey">${t.data.transfers[e].sender} &rarr;\t ${t.data.transfers[e].recipient}</span>
                    </div>
                    <span class="color-blue">₡${t.data.transfers[e].amount}</span>
                </div>`;document.querySelector(".history").insertAdjacentHTML("afterend",a)}}).catch(e=>{console.log(e)});