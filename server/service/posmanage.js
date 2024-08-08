import axios from "axios";
import { getCookie } from "~/assets/js/utils/tools";
import { BASE_URL } from "../config/vars";

export function findUserPosList(posType) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL +
            "/season-quantity-service/strategy/findUserPosList?posType=" +
            posType,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function findUserPosManageListByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-quantity-service/strategy/findUserPosManageListByPage?page=" +
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

export function postPosManage(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/postPosManage",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function deletePosManage(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/deletePosManage",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function statsUserStrategy() {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL + "/season-quantity-service/strategy/statsUserStrategy",
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}
