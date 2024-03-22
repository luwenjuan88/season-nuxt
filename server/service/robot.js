import axios from "axios";
import { getCookie } from "~/assets/js/utils/tools";
import { BASE_URL } from "../config/vars";

// 获取用户所有的客户列表分页
export function findUserListByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-robot-service/robot/findUserListByPage?page=" +
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

export function addRobot(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(BASE_URL + "/season-robot-service/robot/add", data, {
        headers: {
            seasonUser: tokenObject.token,
            apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
        },
    });
}

export function deleteRobot(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(BASE_URL + "/season-robot-service/robot/delete", data, {
        headers: {
            seasonUser: tokenObject.token,
            apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
        },
    });
}

export function restartRobot(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(BASE_URL + "/season-robot-service/robot/restart", data, {
        headers: {
            seasonUser: tokenObject.token,
            apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
        },
    });
}

export function stopRobot(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(BASE_URL + "/season-robot-service/robot/stop", data, {
        headers: {
            seasonUser: tokenObject.token,
            apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
        },
    });
}
