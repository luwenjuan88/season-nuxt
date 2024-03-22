<template>
    <el-dialog
        :title="customerDialogInfo.titleText"
        v-model="customerDialogVisable"
    >
        <div class="flex justify-center">
            <el-form :model="customerForm" label-width="100px" class="w-4/5">
                <el-form-item label="名字">
                    <el-input
                        v-model="customerForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="是否加微">
                    <el-select
                        style="width: 100%"
                        v-model="customerForm.isWei"
                        :default-first-option="true"
                    >
                        <el-option
                            v-for="v in weiTypes"
                            :key="v.id"
                            :label="v.desc"
                            :value="v.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="星级">
                    <el-input
                        v-model="customerForm.star"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        type="textarea"
                        v-model="customerForm.remark"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="my-4 flex justify-center">
            <el-button @click="customerDialogVisable = false">取 消</el-button>
            <el-button type="primary" @click="postCustomer(customerForm)">{{
                customerDialogInfo.buttonText
            }}</el-button>
        </div>
    </el-dialog>

    <el-dialog title="跟进日志" v-model="customerLogDialogVisable" width="80%">
        <el-row :gutter="20">
            <el-col :span="14">
                <el-row :gutter="20">
                    <el-col :span="12"
                        ><div class="grid-content">
                            <div class="text-xs py-2">
                                名字：{{ customerInfo.name }}
                            </div>
                            <div class="text-xs py-2">
                                星级：{{ customerInfo.star }}
                            </div>
                            <div class="text-xs py-2">
                                进度：{{ customerInfo.rate }}
                            </div>
                            <div class="text-xs py-2">
                                备注：{{ customerInfo.remark }}
                            </div>
                        </div></el-col
                    >
                    <el-col :span="12"
                        ><div class="grid-content">
                            <div class="text-xs py-2">
                                名字：{{ customerInfo.name }}
                            </div>
                            <div class="text-xs py-2">
                                星级：{{ customerInfo.star }}
                            </div>
                            <div class="text-xs py-2">
                                进度：{{ customerInfo.rate }}
                            </div>
                            <div class="text-xs py-2">
                                备注：{{ customerInfo.remark }}
                            </div>
                        </div></el-col
                    >
                </el-row>
                <div class="text-xs py-2">
                    备注：222223489999999999999999999999999999999999999999999999
                </div>
            </el-col>
            <el-col :span="8">
                <el-form
                    label-position="right"
                    label-width="70px"
                    size="small"
                    :model="addCustomerLogForm"
                >
                    <el-form-item label="跟进类型">
                        <el-select
                            style="width: 100%"
                            v-model="addCustomerLogForm.flwType"
                            :default-first-option="true"
                        >
                            <el-option
                                v-for="v in FLW_TYPES"
                                :key="v.id"
                                :label="v.name"
                                :value="v.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="跟进内容">
                        <el-input
                            type="textarea"
                            v-model="addCustomerLogForm.content"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker
                            v-model="addCustomerLogForm.createTime"
                            type="date"
                            format="YYYY/MM/DD"
                            size="default"
                            style="width: 100%"
                        >
                            <template #default="cell">
                                <div
                                    class="h-7 py-1"
                                    :class="{
                                        'rounded-full bg-green-200':
                                            isfollowed(cell),
                                    }"
                                >
                                    <span
                                        :class="{
                                            'text-red-500': cell.isCurrent,
                                        }"
                                        >{{ cell.text }}</span
                                    >
                                </div>
                            </template>
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: flex-end">
                    <el-button
                        class="button"
                        @click="postCustomerLog(addCustomerLogForm)"
                    >
                        添加
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-table :data="customerLogs" style="font-size: 12px">
            <el-table-column
                property="id"
                label="日志ID"
                width="80px"
            ></el-table-column>
            <el-table-column
                property="createTime"
                :formatter="dataFormat"
                label="日期"
                width="150px"
            ></el-table-column>
            <el-table-column
                property="flwType"
                label="跟进类型"
                width="100px"
            ></el-table-column>
            <el-table-column
                property="content"
                label="跟进内容"
            ></el-table-column>
            <el-table-column property="score" label="打分"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="80px"
                align="center"
            >
                <template #default="{ row }">
                    <el-button
                        v-if="row.side === 'buy' && row.status === 10"
                        type="text"
                        size="small"
                        @click="editOne(row)"
                        >编辑</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">
            <span>客户列表</span>
            <el-button size="small" link type="info"
                >（你自己的客户）</el-button
            >
        </div>
        <el-button class="my-2 text-xs" @click="addC()">添加客户</el-button>
        <el-table
            :data="customerList"
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
                prop="name"
                label="用户名"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center">
            </el-table-column>
            <el-table-column
                property="createTime"
                :formatter="dataFormat"
                label="注册时间"
                width="150"
                align="center"
            ></el-table-column>
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
                        @click="editCustomer(row)"
                        >编辑</el-button
                    >
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="openCustomerInfo(row)"
                        >跟进</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="page"
            style="font-size: 12px"
            @current-change="handleCustomerCurrentChange"
            :current-page="customerPageInfo.pageNo"
            :page-size="customerPageInfo.pageSize"
            layout="total, prev, pager, next"
            :total="customerPageInfo.dataSize"
        >
        </el-pagination>
    </el-card>

    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">
            <span>合伙客户</span>
            <el-button size="small" link type="info"
                >（你介绍给别人的客户）</el-button
            >
        </div>
        <el-table
            :data="partnerCustomerList"
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
                prop="createTime"
                label="时间"
                width="200"
                align="center"
            >
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
                        @click="openCustomerInfo(row)"
                        >跟进</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="page"
            style="font-size: 12px"
            @current-change="handlePartnerCurrentChange"
            :current-page="partnerPageInfo.pageNo"
            :page-size="partnerPageInfo.pageSize"
            layout="total, prev, pager, next"
            :total="partnerPageInfo.dataSize"
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
import { FLW_TYPES } from "../server/config/vars";

// 合伙客户列表
const partnerCustomerList = ref([]);
const partnerPageInfo = ref({ pageNo: 1, pageSize: 10 });

// 客户列表
const customerList = ref([]);
const customerPageInfo = ref({ pageNo: 1, pageSize: 10 });

// 添加和编辑客户
const customerForm = ref({ isWei: 0 });
const customerDialogVisable = ref(false);
const customerDialogInfo = ref({
    buttonText: "确 定",
    titleText: "添加客户",
});
const weiTypes = ref([
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

// 跟进详情
const customerInfo = ref({ logMap: new Map() });
const customerLogs = ref([]);
const addCustomerLogForm = ref({ createTime: new Date() });
const customerLogDialogVisable = ref(false);
const addCustomerLogText = ref("添 加");

const handleCustomerCurrentChange = (val: number) => {
    customerPageInfo.value.pageNo = val;
    findCustomers();
};
const handlePartnerCurrentChange = (val: number) => {
    partnerPageInfo.value.pageNo = val;
    findPartnerCustomers();
};

const isfollowed = (cell: { date: Date }) => {
    console.log(cell.date);
    const year = cell.date.getFullYear();
    const month = String(cell.date.getMonth() + 1).padStart(2, "0");
    const day = String(cell.date.getDate()).padStart(2, "0");
    const flwKey = `${year}-${month}-${day}`;
    console.log(flwKey);
    //const flwKey = cell.date.format("YYYY-MM-DD");
    console.log(customerInfo.value);
    if (customerInfo.value.logMap) {
        console.log(customerInfo.value.logMap);
        const num = customerInfo.value.logMap[flwKey];
        console.log(num);
        if (num && num > 0) {
            console.log(true);
            return true;
        }
    }
    console.log(false);
    return false;
};

const addC = () => {
    console.log("aaa");
    customerDialogVisable.value = true;
    customerForm.value = { isWei: 0 };
    customerDialogInfo.value.buttonText = "确 定";
    customerDialogInfo.value.titleText = "添加客户";
};
const editCustomer = (val: object) => {
    customerForm.value = val;
    customerDialogVisable.value = true;
    customerDialogInfo.value.buttonText = "更 新";
    customerDialogInfo.value.titleText = "编辑客户";
};
const postCustomer = (data: object) => {
    addCustomerInfo(data).then(async (response) => {
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
                customerDialogVisable.value = false;
                findCustomers();
            }
        }
    });
};

const openCustomerInfo = (val: object) => {
    getCustomerInfo(val).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                customerInfo.value = {};
                customerLogs.value = [];
            } else {
                if (res.data) {
                    customerLogs.value = res.data.logInfos;
                    customerInfo.value = res.data;
                }
                useState("customerLogs", () => {
                    return res.data.dataList;
                });
            }
        }
    });
    customerLogDialogVisable.value = true;
    // 重新打开时，把参数重置
    addCustomerLogForm.value = { createTime: new Date() };
    console.log(customerLogs);
};

const postCustomerLog = (data: object) => {
    data.customerId = customerInfo.value.id;
    // 先把时间改成时间戳
    const timestamp = new Date(data.createTime).getTime();
    data.createTime = timestamp;
    addCustomerLogInfo(data).then(async (response) => {
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
                openCustomerInfo(customerInfo.value);
            }
        }
    });
};

// 卖掉某一单
const editOne = (customerLog: object) => {
    addCustomerLogForm.value = customerLog;
    addCustomerLogText.value = "更新";
};

onMounted(() => {
    findCustomers();
    findPartnerCustomers();
});

const findCustomers = () => {
    findUserCustomersByPage({}, customerPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code > 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    customerList.value = [];
                } else {
                    if (res.data) {
                        customerList.value = res.data.dataList;
                        customerPageInfo.value = res.data;
                    }
                    useState("customerList", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};

const findPartnerCustomers = () => {
    findPartnerCustomersByPage({}, partnerPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code > 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    partnerCustomerList.value = [];
                } else {
                    if (res.data) {
                        partnerCustomerList.value = res.data.dataList;
                        partnerPageInfo.value = res.data;
                    }
                    useState("partnerCustomerList", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};
</script>
