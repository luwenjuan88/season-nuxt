<template>
    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">最新资讯</div>
        <el-row :gutter="20">
            <el-col :span="10">
                <el-card class="mx-4 my-4 py-0" shadow="never" @click="">
                    <div class="flex">
                        <img
                            src="http://luwenjuan.luyuedan.com/mweb/17099798295787.png"
                            style="width: 30%"
                        />
                        <div class="px-3">
                            <span class="text-sm py-3"
                                >如何使用Season量化？</span
                            >
                            <p class="text-xs py-3 text-gray-400">
                                只要控制好风险，剩下的都是收益
                            </p>
                            <a
                                class="text-xs text-blue-400 text-right"
                                href="https://mp.weixin.qq.com/s/j5uQtoEduDMJzlrjosna4A"
                                >更多>></a
                            >
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card class="mx-4 my-4 py-0" shadow="never" @click="">
                    <div class="flex">
                        <img
                            src="http://luwenjuan.luyuedan.com/mweb/550c398e69d659f7ba592710f297c954.jpg"
                            style="width: 30%"
                        />
                        <div class="px-3">
                            <span class="text-sm py-3"
                                >2024牛市要怎样投资？</span
                            >
                            <p class="text-xs py-3 text-gray-400">
                                只要控制好风险，剩下的都是收益
                            </p>
                            <a
                                class="text-xs text-blue-400 text-right"
                                href="/2.html"
                                >更多>></a
                            >
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mx-4 my-4">
        <el-tabs tab-position="top" @tab-change="changeTab">
            <el-tab-pane label="币安币种">
                <el-table
                    style="width: 100%; font-size: 12px"
                    :data="baTokens"
                    border
                    stripe
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50"
                        align="center"
                    />
                    <el-table-column
                        prop="platform"
                        label="交易平台"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tokenName"
                        label="代币名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="price"
                        label="当前价格"
                        align="center"
                    ></el-table-column>
                    <!-- <el-table-column
                        prop="rate"
                        label="涨跌幅(%)"
                        align="center"
                    >
                        <template slot-scope="{ row }"
                            >{{
                                row.rate && (row.rate * 100).toFixed(2)
                            }}%</template
                        >
                    </el-table-column> -->
                    <el-table-column
                        width="200px"
                        :formatter="dataFormat"
                        prop="updateTime"
                        label="更新时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200px"
                        align="center"
                    >
                        <template #default="{ row }">
                            <el-button
                                v-if="row.isUserToken"
                                :key="1"
                                type="text"
                                size="small"
                                disabled
                            >
                                收藏
                            </el-button>
                            <el-button
                                v-else
                                :key="2"
                                type="text"
                                size="small"
                                @click="postUserToken(row)"
                                >收藏</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="page"
                    @current-change="handleBaChange"
                    :current-page="baTokenPageInfo.pageNo"
                    :page-size="baTokenPageInfo.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="baTokenPageInfo.dataSize"
                >
                </el-pagination>
            </el-tab-pane>

            <el-tab-pane label="欧易币种">
                <el-table
                    style="width: 100%; font-size: 12px"
                    :data="okTokens"
                    border
                    stripe
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50"
                        align="center"
                    />
                    <el-table-column
                        prop="platform"
                        label="交易平台"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tokenName"
                        label="代币名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="price"
                        label="当前价格"
                        align="center"
                    ></el-table-column>
                    <!-- <el-table-column
                        prop="rate"
                        label="涨跌幅(%)"
                        align="center"
                    >
                        <template slot-scope="{ row }"
                            >{{
                                row.rate && (row.rate * 100).toFixed(2)
                            }}%</template
                        >
                    </el-table-column> -->
                    <el-table-column
                        width="200px"
                        :formatter="dataFormat"
                        prop="updateTime"
                        label="更新时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200px"
                        align="center"
                    >
                        <template #default="{ row }">
                            <el-button
                                v-if="row.isUserToken"
                                :key="1"
                                type="text"
                                size="small"
                                disabled
                            >
                                收藏
                            </el-button>
                            <el-button
                                v-else
                                :key="2"
                                type="text"
                                size="small"
                                @click="postUserToken(row)"
                                >收藏</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="page"
                    @current-change="handleOkChange"
                    :current-page="okTokenPageInfo.pageNo"
                    :page-size="okTokenPageInfo.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="okTokenPageInfo.dataSize"
                >
                </el-pagination>
            </el-tab-pane>

            <el-tab-pane label="火币币种">
                <el-table
                    style="width: 100%; font-size: 12px"
                    :data="huobiTokens"
                    border
                    stripe
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50"
                        align="center"
                    />
                    <el-table-column
                        prop="platform"
                        label="交易平台"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tokenName"
                        label="代币名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="price"
                        label="当前价格"
                        align="center"
                    ></el-table-column>
                    <!-- <el-table-column
                        prop="rate"
                        label="涨跌幅(%)"
                        align="center"
                    >
                        <template slot-scope="{ row }"
                            >{{
                                row.rate && (row.rate * 100).toFixed(2)
                            }}%</template
                        >
                    </el-table-column> -->
                    <el-table-column
                        width="200px"
                        :formatter="dataFormat"
                        prop="updateTime"
                        label="更新时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200px"
                        align="center"
                    >
                        <template #default="{ row }">
                            <el-button
                                v-if="row.isUserToken"
                                :key="1"
                                type="text"
                                size="small"
                                disabled
                            >
                                收藏
                            </el-button>
                            <el-button
                                v-else
                                :key="2"
                                type="text"
                                size="small"
                                @click="postUserToken(row)"
                                >收藏</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="page"
                    @current-change="handleHuobiChange"
                    :current-page="huobiTokenPageInfo.pageNo"
                    :page-size="huobiTokenPageInfo.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="huobiTokenPageInfo.dataSize"
                >
                </el-pagination>
            </el-tab-pane>

            <el-tab-pane label="AI推送">
                <el-table
                    style="width: 100%; font-size: 12px"
                    :data="pairTokens"
                    border
                    stripe
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50"
                        align="center"
                    />
                    <el-table-column
                        prop="platform"
                        label="交易平台"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tokenName"
                        label="代币名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="price"
                        label="当前价格"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="num"
                        label="AI推荐次数"
                        align="center"
                    ></el-table-column>
                    <!-- <el-table-column
                        prop="rate"
                        label="30min涨跌幅(%)"
                        align="center"
                    >
                        <template slot-scope="{ row }"
                            >{{ (row.rate * 100).toFixed(2) }}%</template
                        >
                    </el-table-column> -->
                    <el-table-column
                        width="200px"
                        :formatter="dataFormat"
                        prop="updateTime"
                        label="更新时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200px"
                        align="center"
                    >
                        <template #default="{ row }">
                            <el-button
                                v-if="row.isUserToken"
                                :key="1"
                                type="text"
                                size="small"
                                disabled
                            >
                                收藏
                            </el-button>
                            <el-button
                                v-else
                                :key="2"
                                type="text"
                                size="small"
                                @click="postUserToken(row)"
                                >收藏</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="page"
                    @current-change="handlePairTokenChange"
                    :current-page="pairTokenPageInfo.pageNo"
                    :page-size="pairTokenPageInfo.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="pairTokenPageInfo.dataSize"
                >
                </el-pagination>
            </el-tab-pane>

            <el-tab-pane label="AI精选">
                <el-table
                    style="width: 100%; font-size: 12px"
                    :data="goodTokens"
                    border
                    stripe
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50"
                        align="center"
                    />
                    <el-table-column
                        prop="platform"
                        label="交易平台"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tokenName"
                        label="代币名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="price"
                        label="当前价格"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="rate30"
                        label="30min涨跌幅(%)"
                        align="center"
                    >
                        <template #default="{ row }"
                            >{{ (row.rate30 * 100).toFixed(2) }}%</template
                        >
                    </el-table-column>
                    <el-table-column
                        width="200px"
                        :formatter="dataFormat"
                        prop="updateTime"
                        label="更新时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200px"
                        align="center"
                    >
                        <template #default="{ row }">
                            <el-button
                                v-if="row.isUserToken"
                                :key="1"
                                type="text"
                                size="small"
                                disabled
                            >
                                收藏
                            </el-button>
                            <el-button
                                v-else
                                :key="2"
                                type="text"
                                size="small"
                                @click="postUserToken(row)"
                                >收藏</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="page"
                    @current-change="handleGoodTokenChange"
                    :current-page="goodTokenPageInfo.pageNo"
                    :page-size="goodTokenPageInfo.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="goodTokenPageInfo.dataSize"
                >
                </el-pagination
            ></el-tab-pane>

            <el-tab-pane label="我的收藏"
                ><el-table
                    style="width: 100%; font-size: 12px"
                    :data="userTokens"
                    border
                    stripe
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="50"
                        align="center"
                    />
                    <el-table-column
                        prop="platform"
                        label="交易平台"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tokenName"
                        label="代币名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="price"
                        label="当前价格"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="rate30"
                        label="30min涨跌幅(%)"
                        align="center"
                    >
                        <template #default="{ row }"
                            >{{ (row.rate30 * 100).toFixed(2) }}%</template
                        >
                    </el-table-column>
                    <el-table-column
                        width="200px"
                        :formatter="dataFormat"
                        prop="updateTime"
                        label="更新时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200px"
                        align="center"
                    >
                        <template #default="{ row }">
                            <el-button
                                type="text"
                                size="small"
                                @click="postUserToken(row)"
                                >取消收藏</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="page"
                    @current-change="handleUserTokenChange"
                    :current-page="userTokenPageInfo.pageNo"
                    :page-size="userTokenPageInfo.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="userTokenPageInfo.dataSize"
                >
                </el-pagination
            ></el-tab-pane>
        </el-tabs>
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
    ElRow,
    ElCol,
    ElPagination,
    ElCalendar,
    ElDatePicker,
    ElTabPane,
    ElTabs,
} from "element-plus";
import {
    addUserToken,
    findAllTokenPairsByPage,
    findAllGoodTokensByPage,
    findTokenPairListByPage,
    findUserTokenListByPage,
    deleteUserToken,
} from "../server/service/token";

const baTokens = ref([]);
const baTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

const okTokens = ref([]);
const okTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

const huobiTokens = ref([]);
const huobiTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

const pairTokens = ref([]);
const pairTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

const goodTokens = ref([]);
const goodTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

const userTokens = ref([]);
const userTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

const tabValue = ref("ALL");

const dataFormat = (row: [], column: { property: number }) => {
    return new Date(row[column.property]).toLocaleString();
};

const changeTab = (val: number) => {
    console.log(val);
    if (val == 0) {
        tabValue.value = "BA";
        findBaListByPage();
    } else if (val == 1) {
        tabValue.value = "OK";
        findOkListByPage();
    } else if (val == 2) {
        tabValue.value = "HUOBI";
        findHuobiListByPage();
    } else if (val == 3) {
        tabValue.value = "ALL";
        findTokenPairsByPage();
    } else if (val == 4) {
        tabValue.value = "GOOD";
        findGoodTokensByPage();
    } else if (val == 5) {
        tabValue.value = "USER";
        findUserTokensByPage();
    } else {
        console.log("error");
    }
};

const findTokenList = () => {
    if (tabValue.value == "BA") {
        findBaListByPage();
    } else if (tabValue.value == "OK") {
        findOkListByPage();
    } else if (tabValue.value == "HUOBI") {
        findHuobiListByPage();
    } else if (tabValue.value == "ALL") {
        findTokenPairsByPage();
    } else if (tabValue.value == "GOOD") {
        findGoodTokensByPage();
    } else if (tabValue.value == "USER") {
        findUserTokensByPage();
    }
};

const handleHuobiChange = (val: number) => {
    huobiTokenPageInfo.value.pageNo = val;
    findHuobiListByPage();
};

const handleOkChange = (val: number) => {
    okTokenPageInfo.value.pageNo = val;
    findOkListByPage();
};

const handleBaChange = (val: number) => {
    baTokenPageInfo.value.pageNo = val;
    findBaListByPage();
};

const handlePairTokenChange = (val: number) => {
    pairTokenPageInfo.value.pageNo = val;
    findTokenPairsByPage();
};

const handleGoodTokenChange = (val: number) => {
    goodTokenPageInfo.value.pageNo = val;
    findGoodTokensByPage();
};

const handleUserTokenChange = (val: number) => {
    userTokenPageInfo.value.pageNo = val;
    findUserTokensByPage();
};

const findHuobiListByPage = () => {
    findAllTokenPairsByPage(
        { platform: "huobi" },
        huobiTokenPageInfo.value
    ).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code != 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                huobiTokens.value = [];
            } else {
                if (res.data) {
                    huobiTokens.value = res.data.dataList;
                    huobiTokenPageInfo.value = res.data;
                }
                useState("huobiTokens", () => {
                    return res.data.dataList;
                });
            }
        }
    });
};

const findBaListByPage = () => {
    findAllTokenPairsByPage(
        { platform: "binance" },
        baTokenPageInfo.value
    ).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code != 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                baTokens.value = [];
            } else {
                if (res.data) {
                    baTokens.value = res.data.dataList;
                    baTokenPageInfo.value = res.data;
                }
                useState("baTokens", () => {
                    return res.data.dataList;
                });
            }
        }
    });
};

const findOkListByPage = () => {
    findAllTokenPairsByPage({ platform: "okex" }, okTokenPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code != 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    okTokens.value = [];
                } else {
                    if (res.data) {
                        okTokens.value = res.data.dataList;
                        okTokenPageInfo.value = res.data;
                    }
                    useState("okTokens", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};

const findTokenPairsByPage = () => {
    findTokenPairListByPage({}, pairTokenPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code != 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    pairTokens.value = [];
                } else {
                    if (res.data) {
                        pairTokens.value = res.data.dataList;
                        pairTokenPageInfo.value = res.data;
                    }
                    useState("pairTokens", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};

const findGoodTokensByPage = () => {
    findAllGoodTokensByPage({}, goodTokenPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code != 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    goodTokens.value = [];
                } else {
                    if (res.data) {
                        goodTokens.value = res.data.dataList;
                        goodTokenPageInfo.value = res.data;
                    }
                    useState("goodTokens", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};

const findUserTokensByPage = () => {
    findUserTokenListByPage({}, userTokenPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code != 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    userTokens.value = [];
                } else {
                    if (res.data) {
                        userTokens.value = res.data.dataList;
                        userTokenPageInfo.value = res.data;
                    }
                    useState("userTokens", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};

const postUserToken = (val: object) => {
    let tokenForm = {
        platform: val.platform,
        tokenName: val.instId,
    };
    addUserToken(tokenForm).then(async (response) => {
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
                findTokenList();
            }
        }
    });
};

const removeUserToken = (val: object) => {
    deleteUserToken(val).then(async (response) => {
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
                findTokenList();
            }
        }
    });
};

onMounted(() => {
    findTokenList();
});
</script>
