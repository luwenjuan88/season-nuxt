// yungouos开发配置
const YUNGOU = {
    mch_id: "xx", // 商户ID
    YUNGOUOS_KEY: "xx", // yungouos开发key
    notify_url: "xx", // 回调通知地址
    api_url: "https://api.pay.yungouos.com/api/pay/wxpay/nativePay",
    default_name: "DayDayMoment会员",
};

// Leancloud开发配置
const AV_CONFIG = {
    appId: "xxx",
    appKey: "xxx",
    masterKey: "xxx",
    serverURL: "xxx",
};

const BASE_URL = "http://season.luyuedan.com/wrmk/api";

const PLATFORMS = [
    { id: 1, name: "binance", value: "binance" },
    { id: 2, name: "okex", value: "okex" },
    { id: 3, name: "huobi", value: "huobi" },
    { id: 4, name: "gateio", value: "gateio" },
    { id: 5, name: "mexc", value: "mexc" },
    { id: 6, name: "kucoin", value: "kucoin" },
    { id: 7, name: "BSC", value: "BSC" },
    { id: 8, name: "Matic", value: "Matic" },
];

const STATUS = [
    {
        id: 1,
        value: 0,
        label: "运行中",
    },
    {
        id: 2,
        value: 1,
        label: "已结束",
    },
    {
        id: 3,
        value: 4,
        label: "已停止",
    },
];

const STRATEGY_TYPES = [
    { id: 1, name: "限价追踪", value: "limit" },
    { id: 2, name: "网格策略", value: "grid" },
    { id: 3, name: "马丁倍投", value: "double" },
    { id: 4, name: "埋伏", value: "smile" },
    { id: 5, name: "埋伏2", value: "smile2" },
    { id: 5, name: "埋伏3", value: "smile3" },
    { id: 6, name: "蚂蚁", value: "ant" },
    { id: 7, name: "蚂蚁2", value: "ant2" },
    { id: 8, name: "蚂蚁3", value: "ant3" },
];

const FLW_TYPES = [
    { id: 1, name: "朋友圈点赞", value: "like" },
    { id: 2, name: "朋友圈评论", value: "comment" },
    { id: 3, name: "微信聊天", value: "chat" },
    { id: 4, name: "电话聊天", value: "phone" },
    { id: 5, name: "见面", value: "meet" },
];

const SIGNALS = [
    {
        id: 1,
        name: "ai",
        desc: "AI推送",
    },
    {
        id: 2,
        name: "marketDrop",
        desc: "大饼暴跌",
    },
    {
        id: 3,
        name: "selfDrop",
        desc: "代币暴跌",
    },
];

const TARGETS = [
    {
        id: 1,
        name: "goodToken",
        desc: "精选列表",
    },
    {
        id: 2,
        name: "userToken",
        desc: "收藏列表",
    },
];

const IS_LIMITS = [
    {
        id: 1,
        value: 0,
        label: "非限价单",
    },
    {
        id: 2,
        value: 1,
        label: "限价单",
    },
];

const IS_HIDES = [
    {
        id: 1,
        value: 0,
        label: "滚仓",
    },
    {
        id: 2,
        value: 1,
        label: "埋伏",
    },
];

const IS_REWARDUS = [
    {
        id: 1,
        value: 0,
        label: "赚币",
    },
    {
        id: 2,
        value: 1,
        label: "赚U",
    },
];

const SECTIONS = [
    {
        id: 2,
        value: "AI",
        label: "AI",
        desc: "AI板块：人工智能",
    },
    {
        id: 3,
        value: "Depin",
        label: "Depin",
        desc: "Depin板块：硬件基础设施",
    },
    {
        id: 4,
        value: "Game",
        label: "Game",
        desc: "游戏板块",
    },
    {
        id: 5,
        value: "Meme",
        label: "Meme",
        desc: "Meme板块：概念币",
    },
    {
        id: 6,
        value: "Rwa",
        label: "Rwa",
        desc: "Rwa板块：现实世界虚拟资产",
    },
    {
        id: 7,
        value: "L2",
        label: "L2",
        desc: "L2板块：Web3基础设施",
    },
    {
        id: 8,
        value: "Sol",
        label: "Sol",
        desc: "Sol生态：最近比较火",
    },
];

const SELECT_SECTIONS = [
    {
        id: 1,
        value: "All",
        label: "All",
    },
    {
        id: 2,
        value: "AI",
        label: "AI",
        desc: "AI板块：人工智能",
    },
    {
        id: 3,
        value: "Depin",
        label: "Depin",
        desc: "Depin板块：硬件基础设施",
    },
    {
        id: 4,
        value: "Game",
        label: "Game",
        desc: "游戏板块",
    },
    {
        id: 5,
        value: "Meme",
        label: "Meme",
        desc: "Meme板块：概念币",
    },
    {
        id: 6,
        value: "Rwa",
        label: "Rwa",
        desc: "Rwa板块：现实世界虚拟资产",
    },
    {
        id: 7,
        value: "L2",
        label: "L2",
        desc: "L2板块：Web3基础设施",
    },
    {
        id: 8,
        value: "Sol",
        label: "Sol",
        desc: "Sol生态：最近比较火",
    },
];

export {
    AV_CONFIG,
    YUNGOU,
    BASE_URL,
    PLATFORMS,
    STATUS,
    STRATEGY_TYPES,
    FLW_TYPES,
    SIGNALS,
    TARGETS,
    IS_LIMITS,
    SECTIONS,
    SELECT_SECTIONS,
    IS_HIDES,
    IS_REWARDUS,
};
