<template>
    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">板块精研</div>
        <div class="text-sm py-3">
            板块的精细化研究，因为币市受板块轮动影响挺大的，利用好板块热度调整仓位，可以最大化的提高资金利用率
        </div>
        <canvas
            ref="lineChart"
            style="height: 200px; width: 80%; margin-right: 10px"
        ></canvas>
    </el-card>
    <el-card class="mx-4 my-4">
        <el-tabs tab-position="top" @tab-change="changeTabValue">
            <el-tab-pane
                v-for="s in SECTIONS"
                :key="s.id"
                :label="s.label"
                :value="s.value"
            >
                <div class="text-xs py-2">
                    {{ s.desc }}
                </div>
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
                        label="代币名"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="price"
                        label="当前价格"
                        align="center"
                    ></el-table-column>
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
} from "../server/service/token";
import { SECTIONS } from "../server/config/vars";
import { Chart, registerables } from "chart.js";
import { getSectionInfoMap } from "../server/service/token.js";

Chart.register(...registerables);
const lineChart = ref(null);

const pairTokens = ref([]);
const pairTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });
const tabValue = ref("AI");

const solSection = ref({});
const aiSection = ref({});
const depinSection = ref({});
const l2Section = ref({});
const rwaSection = ref({});
const gameSection = ref({});
const memeSection = ref({});

const dataFormat = (row: [], column: { property: number }) => {
    return new Date(row[column.property]).toLocaleString();
};

const handlePairTokenChange = (val: number) => {
    pairTokenPageInfo.value.pageNo = val;
    findTokenPairsByPage(tabValue.value);
};

const changeTabValue = (val: number) => {
    console.log(val);
    tabValue.value = SECTIONS[val].value;
    console.log(tabValue.value);
    findTokenPairsByPage(tabValue.value);
};

const findTokenPairsByPage = (section: string) => {
    findTokenPairListByPage({ section: section }, pairTokenPageInfo.value).then(
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
                findTokenPairsByPage(tabValue.value);
            }
        }
    });
};

async function getSectionData() {
    await getSectionInfoMap().then((response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code != 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
            } else {
                if (res.data) {
                    solSection.value = res.data.Sol;
                    aiSection.value = res.data.AI;
                    depinSection.value = res.data.Depin;
                    l2Section.value = res.data.L2;
                    rwaSection.value = res.data.Rwa;
                    gameSection.value = res.data.Game;
                    memeSection.value = res.data.Meme;
                }
                console.log(solSection.value);
            }
        }
    });
}

onMounted(async () => {
    findTokenPairsByPage(tabValue.value);
    await getSectionData();

    console.log("abccccc");
    console.log(solSection.value);
    console.log(solSection.value.temps);

    const ctx = lineChart.value.getContext("2d");
    const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
            {
                label: "Sol",
                data: solSection.value.temps,
                fill: false,
                borderColor: "#CD5C5C",
                tension: 0.4,
                borderWidth: 1,
            },
            {
                label: "AI",
                data: aiSection.value.temps,
                fill: false,
                borderColor: "#EE7942",
                tension: 0.4, // 线条平滑度
                borderWidth: 1, // 线条粗细
            },
            {
                label: "L2",
                data: l2Section.value.temps,
                fill: false,
                borderColor: "#FFA500",
                tension: 0.4, // 线条平滑度
                borderWidth: 1, // 线条粗细
            },
            {
                label: "Depin",
                data: depinSection.value.temps,
                fill: false,
                borderColor: "#2E8B57",
                tension: 0.4, // 线条平滑度
                borderWidth: 1, // 线条粗细
            },
            {
                label: "Meme",
                data: memeSection.value.temps,
                fill: false,
                borderColor: "#00CED1",
                tension: 0.4, // 线条平滑度
                borderWidth: 1, // 线条粗细
            },
            {
                label: "Game",
                data: gameSection.value.temps,
                fill: false,
                borderColor: "#0000EE",
                tension: 0.4, // 线条平滑度
                borderWidth: 1, // 线条粗细
            },
            {
                label: "Rwa",
                data: rwaSection.value.temps,
                fill: false,
                borderColor: "#7D26CD",
                tension: 0.4, // 线条平滑度
                borderWidth: 1, // 线条粗细
            },
        ],
    };
    const chartConfig = {
        type: "line",
        data: data,
        smooth: true,
        options: {
            plugins: {
                title: { display: true, text: "板块热度" },
                legend: { display: false },
            },
            scales: {
                x: {
                    display: true,
                },
                y: {
                    display: true,
                    ticks: {
                        stepSize: 0.5,
                        suggestedMin: 0,
                        suggestedMax: 1,
                    },
                },
            },
        },
    };
    const myChart = new Chart(ctx, chartConfig);
});
</script>
