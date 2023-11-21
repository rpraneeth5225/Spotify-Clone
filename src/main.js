import './style.css'
// import viteLogo from '/vite.svg'

document.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("accessToken")){
    window.location.href = "dashboard/dashboard.html";
  }else{
    window.location.href = "login/login.html";
  }
})
