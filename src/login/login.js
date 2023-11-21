import { doc } from "prettier";
import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_KEY } from "../common";


const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const APP_URL = import.meta.env.VITE_APP_URL;

const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";

const authorizeUser = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.open(url, "login" , "width=800,height=600" );
}
 

document.addEventListener("DOMContentLoaded", () => {

    const LoginButton = document.getElementById("login-to-spotify");
    LoginButton.addEventListener("click", authorizeUser );


window.setItemsInLocalStorage = ({accessToken, tokenType, expiresIn}) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEY, tokenType);
    localStorage.setItem(EXPIRES_IN, expiresIn);
    window.location.href = APP_URL;

}


window.addEventListener("load", () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken){
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }

    if(window.opener && !window.opener.closed){
        window.focus();
        if(window.location. href.includes("error")){
            window.close();
        }

        const { hash } = window.location;
        const SearchParams = new URLSearchParams(hash);
        const accessToken = SearchParams.get("#access_token");
        const tokenType = SearchParams.get("token_type");
        const expiresIn = SearchParams.get("expires_in");
        if(accessToken) {
            window.close();
            window.opener.setItemsInLocalStorage({accessToken, tokenType, expiresIn});
        }else{
            window.close();
        }
    }
})
})

