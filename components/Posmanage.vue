<template>
    <el-dialog
        :title="dialogInfo.tokenTileText"
        v-model="dialogInfo.dialogFormVisible"
    >
        <el-form :model="tokenForm" label-width="100px" class="w-4/5">
            <el-form-item label="币种名称">
                <el-input
                    v-model="tokenForm.tokenName"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="抄底计划">
                <el-input
                    v-model="tokenForm.buyPlan"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="保护计划">
                <el-input
                    v-model="tokenForm.protectPlan"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="资金">
                <el-input
                    v-model="tokenForm.maxAmount"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="板块">
                <el-input
                    v-model="tokenForm.section"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="本金管理">
                <el-input
                    v-model="tokenForm.principal"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="星级">
                <el-input
                    v-model="tokenForm.star"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="支撑位">
                <el-input
                    v-model="tokenForm.support"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="压力位">
                <el-input
                    v-model="tokenForm.stress"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input
                    v-model="tokenForm.remark"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="my-4 flex justify-center">
            <el-button @click="dialogInfo.dialogFormVisible = false"
                >取 消</el-button
            >
            <el-button type="primary" @click="postP(tokenForm)">{{
                dialogInfo.tokenButtonText
            }}</el-button>
        </div>
    </el-dialog>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">个人统计</div>
        <el-row :gutter="20">
            <el-col :span="6"
                ><div class="grid-content">
                    <div class="text-sm py-3">
                        策略总数：{{ userStats.orderCount }}
                    </div>
                    <div class="text-sm py-3">
                        累计已购买：{{ userStats.totalBuyUsdt }}
                    </div>
                </div></el-col
            >
            <el-col :span="6"
                ><div class="grid-content">
                    <div class="text-sm py-3">
                        盈利个数：{{ userStats.riseCount }}
                    </div>
                    <div class="text-sm py-3">
                        累计最成本：{{ userStats.totalBuyMax.toFixed(2) }}
                    </div>
                </div></el-col
            >
            <el-col :span="6"
                ><div class="grid-content">
                    <div class="text-sm py-3">
                        亏损个数：{{ userStats.fallCount }}
                    </div>
                    <div class="text-sm py-3">
                        累计可收益：{{ userStats.totalReward.toFixed(2) }}
                    </div>
                </div></el-col
            >
            <el-col :span="6"
                ><div class="grid-content">
                    <div class="text-sm py-3">
                        命中率：{{ (userStats.shotRate * 100).toFixed(2) }}%
                    </div>
                    <div class="text-sm py-3">
                        收益率：{{ (userStats.rewardRate * 100).toFixed(2) }}%
                    </div>
                </div></el-col
            >
        </el-row>
    </el-card>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">仓位管理</div>
        <el-button class="my-2 text-xs" @click="addPosManage()"
            >添加币种</el-button
        >
        <el-table
            :data="posManageList"
            :row-class="tableRowClassName"
            border
            stripe
            style="width: 100%; font-size: 12px"
        >
            <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
            />
            <el-table-column
                prop="tokenName"
                label="名称"
                width="100"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="buyPlan"
                label="抄底价格"
                width="100"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="usedRatio"
                label="建仓度(%)"
                width="100"
                align="center"
            >
                <template #default="{ row }"
                    >{{ (row.usedRatio * 100).toFixed(0) }}%</template
                >
            </el-table-column>
            <el-table-column
                prop="planRatio"
                label="资金占比"
                width="100"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="buyAvgPrice"
                label="均价"
                width="100"
                align="center"
            >
                <template #default="{ row }">{{
                    row.buyAvgPrice && row.buyAvgPrice.toFixed(4)
                }}</template>
            </el-table-column>
            <el-table-column
                prop="section"
                label="板块"
                width="100"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                align="center"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100px"
                align="center"
            >
                <template #default="{ row }">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="editPosManage(row)"
                        >编辑</el-button
                    >
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="deleteP(row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="page"
            @current-change="handleCurrentChange"
            :current-page="posManagePageInfo.pageNo"
            :page-size="posManagePageInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="posManagePageInfo.dataSize"
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
import { SIGNALS, TARGETS } from "../server/config/vars";
import {
    findUserPosManageListByPage,
    postPosManage,
    deletePosManage,
    statsUserStrategy,
} from "../server/service/posmanage";

// 机器人列表
const posManageList = ref([]);
const posManagePageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });
const userStats = ref({});

// 添加和编辑仓位
const tokenForm = ref({
    id: "",
    platform: "huobi",
    tokenName: "",
    star: "",
    remark: "",
    supportPrice: "",
    stressPrice: "",
});

const dialogInfo = ref({
    dialogFormVisible: false,
    tokenButtonText: "确 定",
    tokenTileText: "添加币种",
});

const tableRowClassName = (val: { row: object; rowIndex: number }) => {
    if (val.row.usedRatio >= 1) {
        return "text-red-600";
    }
    return "";
};
const handleCurrentChange = (val: number) => {
    posManagePageInfo.value.pageNo = val;
    findUserPosManageListByPage();
};

const addPosManage = () => {
    tokenForm.value = {
        platform: "huobi",
        tokenName: "",
        star: "",
        remark: "",
        supportPrice: "",
        stressPrice: "",
    };
    dialogInfo.value.tokenButtonText = "确 定";
    dialogInfo.value.tokenTileText = "添加币种";
    dialogInfo.value.dialogFormVisible = true;
};
const editPosManage = (val: object) => {
    tokenForm.value = val;
    dialogInfo.value.tokenButtonText = "更 新";
    dialogInfo.value.tokenTileText = "编辑币种";
    dialogInfo.value.dialogFormVisible = true;
};

const findUserPosManagesByPage = () => {
    findUserPosManageListByPage({}, posManagePageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code != 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    posManageList.value = [];
                } else {
                    if (res.data) {
                        posManageList.value = res.data.dataList;
                        posManagePageInfo.value = res.data;
                    }
                    useState("posManageList", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};

const postP = (formData: object) => {
    postPosManage(formData).then(async (response) => {
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
                dialogInfo.value.dialogFormVisible = false;
                findUserPosManagesByPage();
            }
        }
    });
};

const deleteP = (varl: object) => {
    deletePosManage(varl).then(async (response) => {
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
                dialogInfo.value.dialogFormVisible = false;
                findUserPosManagesByPage();
            }
        }
    });
};

const statsAll = () => {
    statsUserStrategy().then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code != 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                userStats.value = {};
            } else {
                if (res.data) {
                    userStats.value = res.data;
                }
            }
        }
    });
};

onMounted(() => {
    statsAll();
    findUserPosManagesByPage();
});
</script>
