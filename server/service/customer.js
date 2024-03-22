import axios from "axios";
import { getCookie } from "~/assets/js/utils/tools";
import { BASE_URL } from "../config/vars";

// 获取用户所有的客户列表分页
export function findUserCustomersByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-user-service/customer/findUserCustomersByPage?page=" +
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

export function getCustomerInfo(customerInfo) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL +
            "/season-user-service/customer/getCustomerInfo?customerId=" +
            customerInfo.id,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function addCustomerInfo(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/customer/addCustomerInfo",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function addCustomerLogInfo(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/customer/addCustomerLogInfo",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function deleteCustomer(customerId) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/customer/deleteCustomer",
        {
            id: customerId,
        },
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

// 获取作为合伙人的客户列表分页
export function findPartnerCustomersByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-user-service/customer/findPartnerCustomersByPage?page=" +
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

export function findUserBonusLogsByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-user-service/customer/findUserBonusLogsByPage?page=" +
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

export function updatePartnerBonusLogInfo(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/customer/updatePartnerBonusLogInfo",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function settleOneBonusLog(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-user-service/customer/settleOneBonusLog?bonusId=" +
            data.id,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

// data是用来筛选的
export function settleAllBonusLog(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-user-service/customer/settleAllBonusLog",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function findUserPartnerBonusLogsByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-user-service/customer/findUserPartnerBonusLogsByPage?page=" +
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
