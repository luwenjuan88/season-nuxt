import axios from "axios";
import { getCookie } from "~/assets/js/utils/tools";
import { BASE_URL } from "../config/vars";

// 获取推荐列表
export function findUserChildsByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-user-service/user/findUserChildsByPage?page=" +
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

// 获取返利记录
export function finduserRewardListByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-user-service/user/findUserRewardListByPage?page=" +
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
