<template>
    <el-dialog
        :title="bonusDialogInfo.titleText"
        :visible.sync="bonusDialogVisable"
    >
        <el-form :model="bonusForm">
            <el-form-item label="客户名字" :label-width="formLabelWidth">
                <el-input v-model="bonusForm.customerName"></el-input>
            </el-form-item>
            <el-form-item label="客户带来的收益" :label-width="formLabelWidth">
                <el-input v-model="bonusForm.reward"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="bonusForm.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="bonusDialogVisable = false">取 消</el-button>
            <el-button type="primary" @click="postBonusLog(bonusForm)">{{
                bonusDialogInfo.buttonText
            }}</el-button>
        </div>
    </el-dialog>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">分红列表</div>
        <el-table
            :data="userBonusLogs"
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
                prop="customerName"
                label="客户名"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="partnerName"
                label="合伙人名"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="reward"
                label="客户带来的收益"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="bonus"
                label="分红金额"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                label="时间"
                width="200"
                align="center"
            >
            </el-table-column>
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
                        @click="editUserBonusLog(row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        v-if="row.status"
                        :key="1"
                        type="text"
                        size="small"
                        disabled
                    >
                        结算
                    </el-button>
                    <el-button
                        v-else
                        :key="2"
                        type="text"
                        size="small"
                        @click="settleOne(row)"
                        >结算</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="page"
            style="font-size: 12px"
            @current-change="handleUserBonusCurrentChange"
            :current-page="userBonusPageInfo.pageNo"
            :page-size="userBonusPageInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="userBonusPageInfo.dataSize"
        >
        </el-pagination>
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
        <el-pagination
            class="page"
            style="font-size: 12px"
            @current-change="handlePartnerBonusCurrentChange"
            :current-page="partnerBonusPageInfo.pageNo"
            :page-size="partnerBonusPageInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="partnerBonusPageInfo.dataSize"
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
} from "element-plus";
import {
    findUserCustomersByPage,
    getCustomerInfo,
    addCustomerInfo,
    addCustomerLogInfo,
    deleteCustomer,
    findPartnerCustomersByPage,
    findUserBonusLogsByPage,
    updatePartnerBonusLogInfo,
    settleOneBonusLog,
    settleAllBonusLog,
    findUserPartnerBonusLogsByPage,
} from "../server/service/customer";
import { getCookie, setCookie } from "~/assets/js/utils/tools";

const partnerBonusLogs = ref([]);
const partnerBonusPageInfo = ref({ pageNo: 1, pageSize: 10 });

const userBonusLogs = ref([]);
const userBonusPageInfo = ref({ pageNo: 1, pageSize: 10 });

// 编辑分红
const bonusForm = ref({});
const bonusDialogVisable = ref(false);
const bonusDialogInfo = ref({
    buttonText: "更 新",
    titleText: "编辑分红",
});

const handleUserBonusCurrentChange = (val: number) => {
    userBonusPageInfo.value.pageNo = val;
    findUserBonuss();
};
const handlePartnerBonusCurrentChange = (val: number) => {
    partnerBonusPageInfo.value.pageNo = val;
    findPartnerBonuss();
};

const editUserBonusLog = (val: object) => {
    bonusForm.value = val;
    bonusDialogVisable.value = true;
};

const postBonusLog = (data: object) => {
    updatePartnerBonusLogInfo(data).then(async (response) => {
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
                findUserBonuss();
            }
        }
    });
};

const settleOne = (data: object) => {
    settleOneBonusLog(data).then(async (response) => {
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
                findUserBonuss();
            }
        }
    });
};

onMounted(() => {
    findUserBonuss();
    findPartnerBonuss();
});

const findUserBonuss = () => {
    findUserBonusLogsByPage({}, userBonusPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code > 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    userBonusLogs.value = [];
                } else {
                    if (res.data) {
                        userBonusLogs.value = res.data.dataList;
                        userBonusPageInfo.value = res.data;
                    }
                    useState("userBonusLogs", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};

const findPartnerBonuss = () => {
    findUserPartnerBonusLogsByPage({}, partnerBonusPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code > 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    partnerBonusLogs.value = [];
                } else {
                    if (res.data) {
                        partnerBonusLogs.value = res.data.dataList;
                        partnerBonusPageInfo.value = res.data;
                    }
                    useState("partnerBonusLogs", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};
</script>
