<template>
    <el-dialog title="添加账号" v-model="accountDialogVisible">
        <div class="flex justify-center">
            <el-form :model="accountForm" label-width="100px" class="w-4/5">
                <el-form-item label="平台">
                    <el-select v-model="accountForm.platform">
                        <el-option
                            v-for="v in PLATFORMS"
                            :key="v.id"
                            :label="v.name"
                            :value="v.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="accountForm.accountName"></el-input>
                </el-form-item>
                <el-form-item label="apiKey/地址">
                    <el-input v-model="accountForm.apiKey"></el-input>
                </el-form-item>
                <el-form-item label="secretKey/私钥">
                    <el-input v-model="accountForm.secretKey"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="accountForm.passphrase"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="my-4 flex justify-center">
            <el-button @click="accountDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAccount(accountForm)"
                >确 定</el-button
            >
        </div>
    </el-dialog>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-2">个人管理</div>
        <div class="text-xs py-2">当前用户：{{ userInfo.username }}</div>
        <div class="text-xs py-2">设置策略前，请先添加Api账号！</div>
    </el-card>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">
            <span>个人账号</span>
            <el-button size="small" link type="info" @click="togglePassword">{{
                showPassword ? "【隐藏密码】" : "【显示密码】"
            }}</el-button>
        </div>
        <el-table
            :data="accountList"
            border
            style="width: 100%; font-size: 12px"
        >
            <el-table-column
                prop="platform"
                label="平台"
                width="100"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="accountName"
                label="名称"
                width="100"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="apiKey" label="apiKey/地址" align="center">
            </el-table-column>
            <el-table-column
                prop="secretKey"
                label="secretKey/私钥"
                width="300"
                align="center"
            >
                <template #default="{ row }">
                    <span v-if="showPassword">{{ row.secretKey }}</span>
                    <span v-else>******</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="balanceUsdt"
                label="USDT余额"
                width="100"
                align="center"
            >
                <template #default="{ row }">{{
                    row.balanceUsdt && row.balanceUsdt.toFixed(2)
                }}</template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
                align="center"
            >
                <template #default="{ row }">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="deleteAccount(row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-button class="mt-2 text-xs" @click="accountDialogVisible = true"
            >添加账号</el-button
        >
    </el-card>
</template>

<script setup lang="ts">
import {
    ElButton,
    ElIcon,
    ElCard,
    ElTable,
    ElTableColumn,
    ElMessage,
    ElDialog,
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
    ElInput,
} from "element-plus";
import {
    getApiAccounts,
    addApiAccount,
    deleteApiAccount,
    getUserInfo,
} from "../server/service/user";
import { getCookie, setCookie } from "~/assets/js/utils/tools";
import { PLATFORMS } from "../server/config/vars";

const userInfo = ref({ username: "", inviteCode: "" });

const accountList = ref([]);
const accountDialogVisible = ref(false);
const showPassword = ref(false);

const accountForm = ref({
    platform: "huobi",
    accountName: "",
    apiKey: "",
    secretKey: "",
    passphrase: "",
});

const addAccount = (data: object) => {
    addApiAccount(data).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
            } else {
                ElMessage({
                    message: res.message,
                    type: "success",
                });
                accountDialogVisible.value = false;
                getAccounts();
            }
        }
    });
};

const deleteAccount = (data: object) => {
    deleteApiAccount(data).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
            } else {
                ElMessage({
                    message: res.message,
                    type: "success",
                });
                getAccounts();
            }
        }
    });
};

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

onMounted(() => {
    loadUserInfo();
    getAccounts();
});

// 获取用户信息
const loadUserInfo = () => {
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
            }
        }
    });
};

const getAccounts = () => {
    getApiAccounts().then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
            } else {
                if (res.data) {
                    accountList.value = res.data;
                }
                useState("accountList", () => {
                    return res.data;
                });
            }
        }
    });
};
</script>
