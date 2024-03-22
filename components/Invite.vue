<template>
    <el-card class="mx-4 my-4">
        <div class="text-xs py-2">
            每邀请一位新用户，被邀请的用户得到7天免费试用，如果被邀请者产生消费，邀请者将得到30%返利
        </div>
        <div class="text-xs py-2">您的邀请码：{{ userInfo.inviteCode }}</div>
        <div class="text-xs py-2">
            您的邀请链接：https://xxx.com/invite/{{ userInfo.inviteCode }}
        </div>
        <div class="text-xs py-2">
            <span>账户余额：0 元</span>
            <el-button class="ml-2" size="small">提现</el-button>
        </div>
    </el-card>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">推荐列表</div>
        <el-table
            :data="inviteList"
            border
            style="width: 100%; font-size: 12px"
        >
            <el-table-column
                label="序号"
                type="index"
                :index="
                    (initePageInfo.pageNo - 1) * initePageInfo.pageSize +
                    index +
                    1
                "
                width="100"
                align="center"
            />
            <el-table-column
                prop="nickname"
                label="用户名"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center">
            </el-table-column>
            <el-table-column
                prop="addTime"
                label="注册时间"
                width="200"
                align="center"
            >
            </el-table-column>
        </el-table>
    </el-card>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">返利记录</div>
        <el-table
            :data="rewardList"
            border
            style="width: 100%; font-size: 12px"
        >
            <el-table-column
                label="序号"
                type="index"
                width="100"
                align="center"
            />
            <el-table-column
                prop="amount"
                label="金额"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="desc" label="描述" align="center">
            </el-table-column>
            <el-table-column
                prop="addTime"
                label="时间"
                width="200"
                align="center"
            >
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import {
    ElButton,
    ElCard,
    ElTable,
    ElTableColumn,
    ElMessage,
} from "element-plus";
import {
    findUserChildsByPage,
    finduserRewardListByPage,
} from "../server/service/invite";
import { getCookie, setCookie } from "~/assets/js/utils/tools";
import { getUserInfo } from "../server/service/user";

const userInfo = ref({ username: "", inviteCode: "" });

const rewardList = ref([]);
const rewardPageInfo = ref({ pageNo: 1, pageSize: 10 });

const inviteList = ref([]);
const initePageInfo = ref({ pageNo: 1, pageSize: 10 });

onMounted(() => {
    loadUserInfo();
    getInviteList();
    getRewardList();
});

// 获取用户信息
const loadUserInfo = () => {
    // const res = getCookie("__userInfo");
    // if (res) {
    //     // 如果cookie中有，则使用cookie中的值
    //     const userObject = JSON.parse(decodeURIComponent(res));
    //     userInfo.value = userObject;
    //     useState("userInfo", () => {
    //         return userObject;
    //     });
    // } else {
    // 如果cookie中没有，就请求服务端
    getUserInfo().then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
            } else {
                console.log(res.data);
                if (res.data) {
                    userInfo.value = res.data;
                }
                useState("userInfo", () => {
                    return res.data;
                });
                // // 保存到cookie
                // setCookie(
                //     "__userInfo",
                //     encodeURIComponent(JSON.stringify(res.data)),
                //     365
                // );
            }
        }
    });
    //}
};

const getInviteList = () => {
    findUserChildsByPage({}, initePageInfo.value).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                inviteList.value = [];
            } else {
                if (res.data) {
                    inviteList.value = res.data.dataList;
                    initePageInfo.value = res.data;
                }
                useState("inviteList", () => {
                    return res.data.dataList;
                });
            }
        }
    });
};

const getRewardList = () => {
    finduserRewardListByPage({}, rewardPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code > 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    rewardList.value = [];
                } else {
                    if (res.data) {
                        rewardList.value = res.data.dataList;
                        rewardPageInfo.value = res.data;
                    }
                    useState("rewardList", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};
</script>
