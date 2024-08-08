<template>
    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">设置机器人</div>
        <el-form label-position="top" :model="robotForm">
            <el-row :gutter="20">
                <el-col :span="6"
                    ><div class="text-sm py-3">信号</div>
                    <el-form-item label="信号类型" required="true">
                        <el-select
                            style="width: 70%"
                            v-model="robotForm.signalType"
                            :default-first-option="true"
                        >
                            <el-option
                                v-for="v in SIGNALS"
                                :key="v.id"
                                :label="v.desc"
                                :value="v.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下跌比例(30min)">
                        <el-input
                            style="width: 70%"
                            v-model="robotForm.signalRatio"
                        ></el-input> </el-form-item
                ></el-col>
                <el-col :span="6"
                    ><div class="text-sm py-3">目标</div>
                    <el-form-item label="目标币种" required="true">
                        <el-select
                            style="width: 70%"
                            v-model="robotForm.targetInfo"
                            :default-first-option="true"
                        >
                            <el-option
                                v-for="v in TARGETS"
                                :key="v.id"
                                :label="v.desc"
                                :value="v.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="星级" required="true">
                        <el-input
                            style="width: 70%"
                            v-model="robotForm.star"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="是否模拟" required="true">
                        <el-select
                            style="width: 70%"
                            v-model="robotForm.isSimulate"
                            :default-first-option="true"
                        >
                            <el-option
                                v-for="v in simulateTypes"
                                :key="v.id"
                                :label="v.desc"
                                :value="v.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <div class="text-sm py-3">参数</div>
                    <el-form-item label="策略类型" required="true">
                        <el-select
                            style="width: 70%"
                            v-model="robotForm.strategyType"
                            :default-first-option="true"
                        >
                            <el-option
                                v-for="v in STRATEGY_TYPES"
                                :key="v.id"
                                :label="v.name"
                                :value="v.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="网格数量" required="true">
                        <el-input
                            style="width: 70%"
                            v-model="robotForm.gridNum"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="卖出盈利比例" required="true">
                        <el-input
                            style="width: 70%"
                            v-model="robotForm.profitRatio"
                        ></el-input> </el-form-item
                ></el-col>
                <el-col :span="6">
                    <div class="text-sm py-3">-</div>
                    <el-form-item label="加仓数量列表(U)" required="true">
                        <el-input
                            style="width: 70%"
                            type="textarea"
                            v-model="robotForm.amountStr"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="价格下跌间距列表" required="true">
                        <el-input
                            style="width: 70%"
                            type="textarea"
                            v-model="robotForm.priceRatioStr"
                        ></el-input>
                    </el-form-item>
                    <el-button
                        v-if="robotForm.status === 0"
                        :key="1"
                        type="success"
                        class="button"
                        @click="postR(robotForm)"
                        >{{ robotDialogInfo.buttonText }}</el-button
                    ><el-button
                        v-else
                        :key="2"
                        type="success"
                        class="button"
                        disabled
                        >{{ robotDialogInfo.buttonText }}</el-button
                    >
                    <el-button
                        v-if="
                            robotDialogInfo.buttonVisibale &&
                            robotForm.status === 0
                        "
                        :key="3"
                        class="button"
                        @click="stopR(robotForm)"
                        >停止</el-button
                    >
                    <el-button
                        v-else-if="
                            robotDialogInfo.buttonVisibale &&
                            robotForm.status !== 0
                        "
                        :key="4"
                        class="button"
                        @click="restartR(robotForm)"
                        >重启</el-button
                    >
                </el-col>
            </el-row>
        </el-form>
    </el-card>
    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">机器人列表</div>
        <el-table
            class="table"
            :data="robotList"
            border
            style="width: 100%; font-size: 12px"
        >
            <el-table-column
                label="序号"
                type="index"
                width="50px"
                align="center"
            />
            <el-table-column
                prop="signalType"
                label="信号类型"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="star"
                label="最低星级"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="strategyType"
                label="策略类型"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="gridNum"
                label="网格数量"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="profitRatio"
                label="盈利比例"
                align="center"
            ></el-table-column>
            <el-table-column
                width="200px"
                :formatter="dataFormat"
                prop="createTime"
                label="日期"
                align="center"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200px"
                align="center"
            >
                <template #default="{ row }">
                    <el-button type="text" size="small" @click="toInfo(row)"
                        >详情</el-button
                    >
                    <el-button type="text" size="small" @click="deleteR(row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            class="page"
            @current-change="handleCurrentChange"
            :current-page="robotPageInfo.pageNo"
            :page-size="robotPageInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="robotPageInfo.dataSize"
        >
        </el-pagination>
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
} from "element-plus";
import { getCookie, setCookie } from "~/assets/js/utils/tools";
import { SIGNALS, TARGETS, STRATEGY_TYPES } from "../server/config/vars";
import {
    findUserListByPage,
    addRobot,
    deleteRobot,
    restartRobot,
    stopRobot,
} from "../server/service/robot";

// 机器人列表
const robotList = ref([]);
const robotPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

// 添加和编辑机器人
const robotForm = ref({
    signalType: "ai",
    targetInfo: "goodToken",
    status: 0,
    isSimulate: 1,
    strategyType: "ant3",
});
const robotDialogInfo = ref({
    buttonText: "提 交",
    buttonVisibale: false,
});
const simulateTypes = ref([
    {
        id: 1,
        value: 1,
        desc: "是",
    },
    {
        id: 2,
        value: 0,
        desc: "否",
    },
]);

const dataFormat = (row: [], column: { property: number }) => {
    return new Date(row[column.property]).toLocaleString();
};

const handleCurrentChange = (val: number) => {
    robotPageInfo.value.pageNo = val;
    findUserRobotListByPage();
};

const toInfo = (val: object) => {
    robotForm.value = val;
    robotDialogInfo.value.buttonVisibale = true;
    robotDialogInfo.value.buttonText = "更新";
};

const findUserRobotListByPage = () => {
    findUserListByPage({}, robotPageInfo.value).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code != 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                robotList.value = [];
            } else {
                if (res.data) {
                    robotList.value = res.data.dataList;
                    robotPageInfo.value = res.data;
                }
                useState("robotList", () => {
                    return res.data.dataList;
                });
            }
        }
    });
};

const postR = (formData: object) => {
    addRobot(formData).then(async (response) => {
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

const stopR = (varl: object) => {
    stopRobot(varl).then(async (response) => {
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
                // 修改状态
                robotForm.value.status = 4;
            }
        }
    });
};

const restartR = (varl: object) => {
    restartRobot(varl).then(async (response) => {
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
                // 修改状态
                robotForm.value.status = 0;
            }
        }
    });
};

const deleteR = (varl: object) => {
    deleteRobot(varl).then(async (response) => {
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
                findUserRobotListByPage();
            }
        }
    });
};

onMounted(() => {
    findUserRobotListByPage();
});
</script>
