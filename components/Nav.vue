<template>
    <div
        class="flex justify-between w-full py-4 px-4 lg:px-10 items-center fixed top-0"
    >
        <a class="flex h-14 items-center" href="/">
            <img src="/logo-red.png" class="h-10 lg: lg:h-14" />
            <span class="ml-2 text-xl font-bold hidden lg:block"></span>
        </a>
        <div class="flex space-x-10 items-center">
            <a href="/" class="hidden lg:block">主页</a>
            <a href="/home" class="hidden lg:block" v-if="user.username"
                >策略</a
            >
            <div class="flex items-center justify-end" v-if="user.username">
                <el-dropdown>
                    <div class="flex items-center">
                        <div class="ml-2">{{ user.username }}</div>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </div>
                    <template #dropdown class="w-full">
                        <el-dropdown-menu class="text-center">
                            <el-dropdown-item
                                style="width: 140px"
                                class="justify-center"
                                @click="logout"
                                >退出</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <a href="/sign-in" class="hidden lg:block" v-if="!user.username"
                >登录</a
            >
            <a href="/sign-up" class="hidden lg:block" v-if="!user.username"
                >注册</a
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElIcon,
    ElAvatar,
} from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import { getCookie, clearLocal } from "~/assets/js/utils/tools";

const user = ref({ email: "", username: "" });
const initLocalUser = async () => {
    const res = getCookie("__user");
    console.log("res:", res);

    if (res) {
        const userObject = JSON.parse(decodeURIComponent(res));
        if (userObject) {
            user.value = userObject;
        }
        // console.log($userObject)
        // $store.commit("user", user)
        useState("user", () => {
            return userObject;
        });
    }
};
if (process.client) {
    initLocalUser();
}

const logout = () => {
    clearLocal();
    window.location.href = "/";
};
</script>
