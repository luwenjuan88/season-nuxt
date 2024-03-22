import axios from "axios";
import { getCookie } from "~/assets/js/utils/tools";
import { BASE_URL } from "../config/vars";
//const CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js";

export function login(data) {
    // 密码加密，加密肯定是在js里面加密的
    const { username, password } = data;
    const hashedStr = CryptoJS.SHA256(password).toString();
    return axios.post(BASE_URL + "/authority/login", {
        username: username,
        password: hashedStr,
    });
}

export function register(data) {
    // 密码加密，加密肯定是在js里面加密的
    const { username, password, invitecode } = data;
    const hashedStr = CryptoJS.SHA256(password).toString();
    return axios.post(BASE_URL + "/authority/register", {
        username: username,
        password: hashedStr,
        invitecode: invitecode,
    });
}

export function getUserInfo() {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    console.log(tokenObject);
    return axios.get(BASE_URL + "/season-user-service/user/info", {
        headers: {
            seasonUser: tokenObject.token,
        },
    });
}

export function addApiAccount(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/account/addApiAccount",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function getApiAccounts() {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(BASE_URL + "/season-user-service/account/getApiAccounts", {
        headers: {
            seasonUser: tokenObject.token,
            apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
        },
    });
}

export function deleteApiAccount(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/account/deleteAccount",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}
