const base_url="https://exchange-nodejs.herokuapp.com";document.querySelector("#signup").addEventListener("click",()=>{var e=document.querySelector("#email").value,t=document.querySelector("#nickname").value,n=document.querySelector("#password").value,a=document.querySelector("#firstname").value,o=document.querySelector("#lastname").value;fetch(base_url+"/users/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,nickname:t,firstname:a,lastname:o,password:n})}).then(e=>e.json()).then(t=>{if("success"===t.status){var e=t.data.token;localStorage.setItem("token",e),window.location.href="login.html"}else{let e=document.querySelector(".card__alert");e.textContent=t.message,e.classList.remove("hidden")}})});