import axios from "axios";
import { getCookie } from "~/assets/js/utils/tools";
import { BASE_URL } from "../config/vars";

export function getToUnlockStrategyListById(strategyId) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL +
            "/season-quantity-service/strategy/getToUnlockStrategyListById?strategyId=" +
            strategyId,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function getToUnlockStrategyList() {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL + "/season-quantity-service/strategy/getToUnlockStrategyList",
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function deleteStrategy(strategyId, strategyType) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/delete",
        {
            id: strategyId,
            strategyType: strategyType,
        },
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function restartStrategy(strategyId, strategyType) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/restart",
        {
            id: strategyId,
            strategyType: strategyType,
        },
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function stopStrategy(strategyId, strategyType) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/stop",
        {
            id: strategyId,
            strategyType: strategyType,
        },
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function getStrategyInfo(strategyId, strategyType) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL +
            "/season-quantity-service/strategy/getStrategyInfo?strategyId=" +
            strategyId +
            "&strategyType=" +
            strategyType,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function addStrategy(data) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/add",
        data,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function findUserStrategyListByPage(data, pageObject) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL +
            "/season-quantity-service/strategy/findUserStrategyListByPage?page=" +
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

// tradeInfo是策略和日志组合体
export function getStrategyTradeInfo(tradeInfo) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL +
            "/season-quantity-service/strategy/getStrategyTradeInfo?strategyId=" +
            tradeInfo.id +
            "&strategyType=" +
            tradeInfo.strategyType,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

// 获取策略的仓位详情
export function getStrategyPosInfo(tradeInfo) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL +
            "/season-quantity-service/strategy/getStrategyPosInfo?strategyId=" +
            tradeInfo.id,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function getCurrentPrice(tradeInfo) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.get(
        BASE_URL +
            "/season-market-service/market/getCurrentPrice?apiKeyId=" +
            tradeInfo.apiKeyId +
            "&instId=" +
            tradeInfo.instId,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

// 取消仓位订单
export function cancelPosTrade(posLog) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/cancelPosTrade",
        posLog,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function cancelPendingTrade(tradeLog) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/cancelPendingTrade",
        tradeLog,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function cancelLimitTrade(tradeLog) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/cancelLimitTrade",
        tradeLog,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}

export function addTrade(tradeForm) {
    const res = getCookie("__token");
    const tokenObject = JSON.parse(decodeURIComponent(res));
    return axios.post(
        BASE_URL + "/season-quantity-service/strategy/addTrade",
        tradeForm,
        {
            headers: {
                seasonUser: tokenObject.token,
                apifoxToken: "htblRLQX8ZHzgh7rLZMYF3DH0fBgrl78",
            },
        }
    );
}
