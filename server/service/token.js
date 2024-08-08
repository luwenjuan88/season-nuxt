import axios from "axios";
import { getCookie } from "~/assets/js/utils/tools";
import { BASE_URL } from "../config/vars";

export function getTopNAiTokens(num) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL + "/season-market-service/market/getTopNAiTokens?num=" + num,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function getSectionInfoMap() {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL + "/season-market-service/market/getSectionInfoMap",
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function deleteUserToken(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/token/deleteUserToken",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function addUserToken(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/token/addUserToken",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

// 获取所有的市场币种
export function findMarketTokenPairsByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-market-service/market/findAllTokenPairsByPage?page=" +
            pageObject.pageNo +
            "&pageSize=" +
            pageObject.pageSize,
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function findAllGoodTokensByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-market-service/token/findAllGoodTokensByPage?page=" +
            pageObject.pageNo +
            "&pageSize=" +
            pageObject.pageSize,
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function findTokenPairListByPage(data, pageObject) {
    console.log(pageObject);
    console.log(pageObject.pageNo);
    console.log(pageObject.pageSize);
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-market-service/token/findTokenPairListByPage?page=" +
            pageObject.pageNo +
            "&pageSize=" +
            pageObject.pageSize,
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function findUserTokenListByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-user-service/token/findUserTokenListByPage?page=" +
            pageObject.pageNo +
            "&pageSize=" +
            pageObject.pageSize,
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}
