<template>
    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">板块精研</div>
        <div class="text-sm py-3">
            这个部分想做一些板块的精细化研究，因为币市受板块轮动影响挺大的，如果能把这个部分做好，可以最大化的提高资金利用率
        </div>
        <div class="text-sm py-3">目前还在进行中。。。</div>
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

Chart.register(...registerables);
const lineChart = ref(null);

const pairTokens = ref([]);
const pairTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });
const tabValue = ref("AI");

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
            }
        }
    });
};

onMounted(() => {
    findTokenPairsByPage(tabValue.value);

    const ctx = lineChart.value.getContext("2d");
    const data = {
        labels: ["j", "f", "m", "a", "m", "j", "j"],
        datasets: [
            {
                label: "test",
                data: [0.3, 0.4, 0.9, 0.1, 0.3, 0.2, 0.8],
                fill: false,
                borderColor: "#3CEF20",
                tension: 0.4,
                borderWidth: 1,
            },
            {
                label: "test1",
                data: [0.1, 0.5, 0.3, 0.4, 0.8, 0.5, 0.6],
                fill: false,
                borderColor: "#4CAF50",
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
