<template>
    <client-only>
        <div class="flex w-full">
            <div class="w-2/12 overflow-y-auto">
                <div class="h-full border-r-2">
                    <!-- logo部分 -->
                    <div class="py-4">
                        <a class="flex px-1 items-center" href="/">
                            <img src="/logo-red.png" class="" />
                        </a>
                    </div>
                    <!-- 分割线 -->
                    <div class="ml-3 border-t pb-2 w-10/12"></div>
                    <!-- 导航部分 -->
                    <div
                        @click="tabClick('Home')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600': activeTab == 'Home',
                        }"
                    >
                        首页
                    </div>
                    <div
                        @click="tabClick('Plate')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600': activeTab == 'Plate',
                        }"
                    >
                        板块精研
                    </div>
                    <div class="w-full py-4 pl-4 text-gray-300 text-xs">
                        策略
                    </div>
                    <div
                        @click="tabClick('Posmanage')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600':
                                activeTab == 'Posmanage',
                        }"
                    >
                        仓位管理
                    </div>
                    <div
                        @click="tabClick('Setstrategy')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-green-600':
                                activeTab == 'Setstrategy',
                        }"
                    >
                        设置策略
                    </div>
                    <div
                        @click="tabClick('Mystrategy')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600':
                                activeTab == 'Mystrategy',
                        }"
                    >
                        我的策略
                    </div>

                    <div
                        @click="tabClick('Autorobot')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600':
                                activeTab == 'Autorobot',
                        }"
                    >
                        自动量化机器人
                    </div>
                    <div class="w-full py-4 pl-4 text-gray-300 text-xs">
                        设置
                    </div>
                    <div
                        @click="tabClick('Myprofile')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600':
                                activeTab == 'Myprofile',
                        }"
                    >
                        个人中心
                    </div>
                    <div
                        @click="tabClick('Subscribe')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600':
                                activeTab == 'Subscribe',
                        }"
                    >
                        订阅
                    </div>
                    <div
                        @click="tabClick('Invite')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600': activeTab == 'Invite',
                        }"
                    >
                        邀请
                    </div>
                    <div
                        @click="tabClick('Author')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600': activeTab == 'Author',
                        }"
                    >
                        作者介绍
                    </div>
                    <!-- <div
                        @click="tabClick('Customer')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600':
                                activeTab == 'Customer',
                        }"
                    >
                        客户管理
                    </div>
                    <div
                        @click="tabClick('Partner')"
                        class="w-full cursor-pointer py-3 pl-8 text-sm hover:bg-orange-50"
                        :class="{
                            'bg-orange-50 text-red-600': activeTab == 'Partner',
                        }"
                    >
                        合伙管理
                    </div> -->
                    <div></div>
                </div>
            </div>
            <div class="w-10/12 overflow-y-auto">
                <div
                    class="flex items-center border-b-2 py-1 px-4 text-xs"
                    style="height: 43px"
                >
                    <div class="w-8/12 flex items-center">
                        <div></div>
                    </div>

                    <div class="w-4/12 flex items-center justify-end">
                        <div class="ml-4">
                            <el-dropdown @command="handleCommand">
                                <span class="flex items-center">
                                    <span>{{ userInfo.username }}</span>
                                    <span v-if="memberVerify" class="ml-1">
                                        <svg
                                            t="1676988208534"
                                            class="icon"
                                            viewBox="0 0 1024 1024"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            p-id="3087"
                                            width="16"
                                            height="16"
                                        >
                                            <path
                                                d="M493.2 958.1c-6 0-11.7-2.8-15.4-7.6L32.6 370.4c-5.4-7-5.4-16.7 0-23.7L255.2 58.4c3.7-4.8 9.4-7.6 15.4-7.6h445.2c6 0 11.7 2.8 15.4 7.6l222.6 288.2c5.4 7 5.4 16.7 0 23.7L508.6 950.5c-3.6 4.8-9.3 7.6-15.4 7.6zM72.6 358.6l420.6 548.1 420.6-548.1L706.2 89.8h-426L72.6 358.6z"
                                                fill="#EB455F"
                                                p-id="3088"
                                            ></path>
                                            <path
                                                d="M919.6 382H66.8c-10.7 0-19.5-8.7-19.5-19.4 0-10.8 8.7-19.5 19.5-19.5h852.9c10.8 0 19.5 8.7 19.5 19.5-0.1 10.7-8.8 19.4-19.6 19.4z"
                                                fill="#EB455F"
                                                p-id="3089"
                                            ></path>
                                            <path
                                                d="M492.5 382c-0.1 0-0.1 0 0 0-6.1 0-11.8-2.9-15.5-7.7L255.1 82.1c-6.5-8.6-4.8-20.8 3.7-27.3 8.6-6.5 20.8-4.8 27.3 3.7l206.4 271.9L700.3 58.5c6.5-8.5 18.8-10.1 27.3-3.6 8.6 6.5 10.2 18.7 3.6 27.3L507.9 374.3c-3.7 4.9-9.4 7.7-15.4 7.7z"
                                                fill="#EB455F"
                                                p-id="3090"
                                            ></path>
                                        </svg>
                                    </span>
                                    <el-icon class="el-icon--right"
                                        ><arrow-down
                                    /></el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item
                                            command="quit"
                                            divided
                                            class=""
                                            >退出</el-dropdown-item
                                        >
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                </div>
                <!-- 这里采用动态组件 -->
                <component
                    :is="currentComponent"
                    :activeTab="activeTab"
                    :activeStrategyId="activeStrategyId"
                    :activeStrategyType="activeStrategyType"
                    @updateValues="handleUpdateValues"
                ></component>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import axios from "axios";
import {
    ElIcon,
    ElButton,
    ElDropdown,
    ElInput,
    ElDropdownMenu,
    ElDropdownItem,
    ElConfigProvider,
    ElForm,
    ElFormItem,
    ElMessage,
    ID_INJECTION_KEY,
    ElCard,
} from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { getCookie, setCookie, clearLocal } from "~/assets/js/utils/tools";
import {
    Home,
    Plate,
    Setstrategy,
    Autorobot,
    Invite,
    Myprofile,
    Mystrategy,
    Posmanage,
    Subscribe,
    Author,
    Customer,
    Partner,
} from "#components";
import { getUserInfo } from "../server/service/user";

const userInfo = ref({ username: "", inviteCode: "" });

const activeTab = ref("Home");
const activeStrategyId = ref(0);
const activeStrategyType = ref("grid");
const currentComponent = ref(Home);

onMounted(() => {
    loadUserInfo();
});

// 获取用户信息
const loadUserInfo = () => {
    // 如果cookie中没有，就请求服务端
    const res = getCookie("__token");
    console.log(res);
    if (res == null || res.trim() == "") {
        // 退出
        clearLocal();
        window.location.href = "/sign-in";
    }
    getUserInfo().then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code != 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                // 退出
                clearLocal();
                window.location.href = "/";
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

const handleUpdateValues = (newTab: string, newId: number, newType: string) => {
    activeTab.value = newTab;
    activeStrategyId.value = newId;
    activeStrategyType.value = newType;
    console.log(newTab);
    console.log(newId);
    console.log(newType);
    if (newTab === "Home") {
        currentComponent.value = Home;
    } else if (newTab === "Plate") {
        currentComponent.value = Plate;
    } else if (newTab === "Setstrategy") {
        currentComponent.value = Setstrategy;
    } else if (newTab === "Autorobot") {
        currentComponent.value = Autorobot;
    } else if (newTab === "Invite") {
        currentComponent.value = Invite;
    } else if (newTab === "Myprofile") {
        currentComponent.value = Myprofile;
    } else if (newTab === "Mystrategy") {
        currentComponent.value = Mystrategy;
    } else if (newTab === "Posmanage") {
        currentComponent.value = Posmanage;
    } else if (newTab === "Subscribe") {
        currentComponent.value = Subscribe;
    } else if (newTab === "Author") {
        currentComponent.value = Author;
    }
    // else if (newTab === "Customer") {
    //     currentComponent.value = Customer;
    // } else if (newTab === "Partner") {
    //     currentComponent.value = Partner;
    // }
};

const tabClick = (active: string) => {
    activeTab.value = active;
    // 根据点击的tab，改变currentComponent的值
    if (active === "Home") {
        currentComponent.value = Home;
    } else if (active === "Plate") {
        currentComponent.value = Plate;
    } else if (active === "Setstrategy") {
        currentComponent.value = Setstrategy;
    } else if (active === "Autorobot") {
        currentComponent.value = Autorobot;
    } else if (active === "Invite") {
        currentComponent.value = Invite;
    } else if (active === "Myprofile") {
        currentComponent.value = Myprofile;
    } else if (active === "Mystrategy") {
        currentComponent.value = Mystrategy;
    } else if (active === "Posmanage") {
        currentComponent.value = Posmanage;
    } else if (active === "Subscribe") {
        currentComponent.value = Subscribe;
    } else if (active === "Author") {
        currentComponent.value = Author;
    }
    // else if (active === "Customer") {
    //     currentComponent.value = Customer;
    // } else if (active === "Partner") {
    //     currentComponent.value = Partner;
    // }
};

const memberVerify = ref(true);

const handleCommand = (command: string | number | object) => {
    if (command === "quit") {
        clearLocal();
        window.location.href = "/sign-in";
    }
};
</script>
