<template>
    <div class="mx-4 my-4">
        <el-row :gutter="40">
            <el-col :span="13">
                <el-card
                    shadow="never"
                    style="display: flex; justify-content: center"
                >
                    <el-form
                        size="small"
                        label-position="right"
                        label-width="140px"
                        :model="strategyForm"
                    >
                        <el-form-item label="策略类型" required>
                            <el-select
                                v-if="isUpdate"
                                v-model="strategyForm.strategyType"
                                :default-first-option="true"
                                disabled
                            >
                                <el-option
                                    v-for="v in STRATEGY_TYPES"
                                    :key="v.id"
                                    :label="v.name"
                                    :value="v.value"
                                ></el-option>
                            </el-select>
                            <el-select
                                v-else
                                v-model="strategyForm.strategyType"
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
                        <el-form-item label="策略名称" required>
                            <el-input
                                v-model="strategyForm.strategyName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="选择账号" required>
                            <el-select
                                v-if="isUpdate"
                                v-model="strategyForm.apiKeyId"
                                :default-first-option="true"
                                disabled
                            >
                                <el-option
                                    v-for="v in accountList"
                                    :key="v.id"
                                    :label="v.platform + '-' + v.accountName"
                                    :value="v.id"
                                ></el-option>
                            </el-select>
                            <el-select
                                v-else
                                v-model="strategyForm.apiKeyId"
                                :default-first-option="true"
                            >
                                <el-option
                                    v-for="v in accountList"
                                    :key="v.id"
                                    :label="v.platform + '-' + v.accountName"
                                    :value="v.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="代币名称" required>
                            <el-input
                                v-if="isUpdate"
                                disabled
                                v-model="strategyForm.tokenName"
                            ></el-input>
                            <el-input
                                v-else
                                v-model="strategyForm.tokenName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input
                                type="textarea"
                                v-model="strategyForm.remark"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="板块">
                            <el-input v-model="strategyForm.section"></el-input>
                        </el-form-item>

                        <!-- 操作 -->
                        <el-form-item
                            v-if="strategyForm.strategyType === 'limit'"
                            label="操作"
                            prop="side"
                        >
                            <el-select
                                v-model="strategyForm.side"
                                default="buy"
                            >
                                <el-option label="买" value="buy"></el-option>
                                <el-option label="卖" value="sell"></el-option>
                            </el-select>
                        </el-form-item>

                        <!-- 加仓次数 -->
                        <el-form-item
                            v-if="
                                strategyForm.strategyType === 'ant' ||
                                strategyForm.strategyType === 'ant2' ||
                                strategyForm.strategyType === 'ant3'
                            "
                            label="最大加仓次数"
                            required
                        >
                            <el-input v-model="strategyForm.gridNum"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-else-if="strategyForm.strategyType === 'double'"
                            label="倍投次数"
                            required
                        >
                            <el-input v-model="strategyForm.gridNum"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-if="
                                strategyForm.strategyType === 'grid' ||
                                strategyForm.strategyType === 'smile' ||
                                strategyForm.strategyType === 'smile2' ||
                                strategyForm.strategyType === 'smile3'
                            "
                            label="网格数量"
                            required
                        >
                            <el-input v-model="strategyForm.gridNum"></el-input>
                        </el-form-item>

                        <!-- 基础价格 -->
                        <el-form-item
                            v-if="strategyForm.strategyType === 'limit'"
                            label="价格"
                            required
                        >
                            <el-input
                                v-model="strategyForm.basePrice"
                            ></el-input>
                        </el-form-item>
                        <el-form-item v-else label="初始建仓价格" required>
                            <el-input
                                v-model="strategyForm.basePrice"
                            ></el-input>
                        </el-form-item>

                        <!-- 加仓数量 -->
                        <el-form-item
                            v-if="strategyForm.strategyType === 'limit'"
                            label="数量"
                            required
                        >
                            <el-input v-model="strategyForm.amount"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-else-if="
                                strategyForm.strategyType === 'grid' ||
                                strategyForm.strategyType === 'double' ||
                                strategyForm.strategyType === 'smile' ||
                                strategyForm.strategyType === 'smile2'
                            "
                            label="起始数量(U)"
                            required
                        >
                            <el-input v-model="strategyForm.amount"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-else-if="
                                strategyForm.strategyType === 'ant' ||
                                strategyForm.strategyType === 'ant2'
                            "
                            label="加仓数量(U)"
                            required
                        >
                            <el-input v-model="strategyForm.amount"></el-input>
                        </el-form-item>
                        <el-form-item
                            v-else-if="
                                strategyForm.strategyType === 'ant3' ||
                                strategyForm.strategyType === 'smile3'
                            "
                            label="加仓数量列表(U)"
                            required
                        >
                            <el-input
                                type="textarea"
                                v-model="strategyForm.amountStr"
                            ></el-input>
                        </el-form-item>

                        <!-- 波动比例 -->
                        <el-form-item
                            v-if="strategyForm.strategyType === 'ant'"
                            label="价格下跌间距(%)"
                            required
                        >
                            <el-input
                                v-model="strategyForm.priceRatio"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            v-else-if="
                                strategyForm.strategyType === 'ant2' ||
                                strategyForm.strategyType === 'ant3' ||
                                strategyForm.strategyType === 'smile3'
                            "
                            label="下跌间距列表(%)"
                            required
                        >
                            <el-input
                                type="textarea"
                                v-model="strategyForm.priceRatioStr"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            v-else-if="
                                strategyForm.strategyType === 'smile' ||
                                strategyForm.strategyType === 'smile2' ||
                                strategyForm.strategyType === 'grid' ||
                                strategyForm.strategyType === 'double'
                            "
                            label="波动比例(%)"
                            required
                        >
                            <el-input
                                v-model="strategyForm.priceRatio"
                            ></el-input>
                        </el-form-item>

                        <!-- 卖出盈利 -->
                        <el-form-item
                            v-if="strategyForm.strategyType !== 'limit'"
                            label="卖出盈利比例"
                            required
                        >
                            <el-input
                                v-model="strategyForm.profitRatio"
                            ></el-input>
                        </el-form-item>

                        <!-- 解套逻辑 -->
                        <el-form-item
                            v-if="
                                strategyForm.strategyType === 'ant' ||
                                strategyForm.strategyType === 'ant2' ||
                                strategyForm.strategyType === 'ant3'
                            "
                            label="第几仓触发解套"
                            required
                        >
                            <el-input
                                v-model="strategyForm.unlockStart"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            v-if="
                                strategyForm.strategyType === 'ant' ||
                                strategyForm.strategyType === 'ant2' ||
                                strategyForm.strategyType === 'ant3'
                            "
                            label="解套回调比例"
                            required
                        >
                            <el-input
                                v-model="strategyForm.unlockBackRatio"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            v-if="
                                strategyForm.strategyType === 'ant' ||
                                strategyForm.strategyType === 'ant2' ||
                                strategyForm.strategyType === 'ant3'
                            "
                            label="解套盈利比例"
                            required
                        >
                            <el-input
                                v-model="strategyForm.unlockProfitRatio"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            v-if="
                                strategyForm.strategyType === 'ant' ||
                                strategyForm.strategyType === 'ant2' ||
                                strategyForm.strategyType === 'ant3'
                            "
                            label="跨币种解套策略"
                        >
                            <el-select
                                v-model="strategyForm.toUnlockId"
                                :default-first-option="true"
                            >
                                <el-option
                                    v-for="v in toUnlockStrategyList"
                                    :key="v.id"
                                    :label="v.strategyName"
                                    :value="v.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="盈利币种">
                            <el-select
                                v-model="strategyForm.isRewardU"
                                :default-first-option="true"
                            >
                                <el-option
                                    v-for="v in IS_REWARDUS"
                                    :key="v.id"
                                    :label="v.label"
                                    :value="v.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="盈利模式">
                            <el-select
                                v-model="strategyForm.isHide"
                                :default-first-option="true"
                            >
                                <el-option
                                    v-for="v in IS_HIDES"
                                    :key="v.id"
                                    :label="v.label"
                                    :value="v.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="11">
                <el-card shadow="never">
                    <!-- 根据策略类型匹配文字组件，传递参数formData-->
                    <Ant3Text
                        v-if="strategyForm.strategyType === 'ant3'"
                        :formData="strategyForm"
                    ></Ant3Text>
                    <Ant2Text
                        v-else-if="strategyForm.strategyType === 'ant2'"
                        :formData="strategyForm"
                    ></Ant2Text>
                    <AntText
                        v-else-if="strategyForm.strategyType === 'ant'"
                        :formData="strategyForm"
                    ></AntText>
                    <SmileText
                        v-else-if="strategyForm.strategyType === 'smile'"
                        :formData="strategyForm"
                    ></SmileText>
                    <Smile2Text
                        v-else-if="strategyForm.strategyType === 'smile2'"
                        :formData="strategyForm"
                    ></Smile2Text>
                    <Smile3Text
                        v-else-if="strategyForm.strategyType === 'smile3'"
                        :formData="strategyForm"
                    ></Smile3Text>
                    <GridText
                        v-else-if="strategyForm.strategyType === 'grid'"
                        :formData="strategyForm"
                    ></GridText>
                    <DoubleText
                        v-else-if="strategyForm.strategyType === 'double'"
                        :formData="strategyForm"
                    ></DoubleText>
                    <LimitText
                        v-else-if="strategyForm.strategyType === 'limit'"
                        :formData="strategyForm"
                    ></LimitText>

                    <div class="my-4">
                        <el-button
                            v-if="strategyForm.status === 0"
                            :key="1"
                            type="success"
                            class="button"
                            @click="postStrategy(strategyForm)"
                            >{{ buttonText }}</el-button
                        ><el-button
                            v-else
                            :key="2"
                            type="success"
                            class="button"
                            disabled
                            >{{ buttonText }}</el-button
                        >
                        <el-button
                            v-if="isUpdate && strategyForm.status === 0"
                            :key="3"
                            class="button"
                            @click="stopS(strategyId, strategyType)"
                            >停止</el-button
                        >
                        <el-button
                            v-else-if="isUpdate && strategyForm.status !== 0"
                            :key="4"
                            class="button"
                            @click="restartS(strategyId, strategyType)"
                            >重启</el-button
                        >
                        <el-button
                            v-if="isUpdate"
                            :key="5"
                            class="button"
                            @click="deleteS(strategyId, strategyType)"
                            >删除</el-button
                        >
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup props="strategyId" lang="ts">
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
    ElSwitch,
} from "element-plus";
import { stringify } from "leancloud-storage";
import {
    addStrategy,
    getStrategyInfo,
    stopStrategy,
    restartStrategy,
    deleteStrategy,
    getToUnlockStrategyList,
    getToUnlockStrategyListById,
} from "../server/service/strategy";
import {
    getApiAccounts,
    addApiAccount,
    deleteApiAccount,
    getUserInfo,
} from "../server/service/user";
import { IS_HIDES, STRATEGY_TYPES, IS_REWARDUS } from "../server/config/vars";

const emits = defineEmits(["updateValues"]);

// 接收从父组件传来的变量
const props = defineProps({
    activeTab: String,
    activeStrategyId: Number,
    activeStrategyType: Number,
});

const strategyForm = ref({
    strategyType: "smile3",
    strategyName: "",
    apiKeyId: "",
    tokenName: "",
    gridNum: "7", // 最大加仓次数
    amountStr: "200,200,200,300,300,300,400", // 单次加仓的数量，U
    basePrice: "", // 初始建仓价格
    priceRatioStr: "1,1,1,2,2,2,3", // 价格下跌间距
    backRatio: "", // 回调比例
    profitRatio: "2", // 盈利比例
    unlockStart: "6", // 从第几仓开启解套逻辑
    unlockBackRatio: "0.03", // 解套回调比例
    unlockProfitRatio: "0.01", // 解套盈利比例
    tounlockId: "",
    status: 0,
    isHide: 0,
    isRewardU: 0,
});

const accountList = ref([]);
const toUnlockStrategyList = ref([]);
const strategyId = ref(0);
const strategyType = ref("");
const buttonText = ref("提交");
const isUpdate = ref(false);

const postStrategy = (formData: object) => {
    addStrategy(formData).then(async (response) => {
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
                // todo 进入我的策略页面
                emits("updateValues", "Mystrategy", "", "");
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

const getStrategy = (strategyId: number, strategyType: string) => {
    getStrategyInfo(strategyId, strategyType).then(async (response) => {
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
                    strategyForm.value = res.data;
                }
                useState("strategyForm", () => {
                    return res.data;
                });
            }
        }
    });
};

const stopS = (strategyId: number, strategyType: string) => {
    stopStrategy(strategyId, strategyType).then(async (response) => {
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
                strategyForm.value.status = 4;
            }
        }
    });
};

const restartS = (strategyId: number, strategyType: string) => {
    restartStrategy(strategyId, strategyType).then(async (response) => {
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
                strategyForm.value.status = 0;
            }
        }
    });
};

const deleteS = (strategyId: number, strategyType: string) => {
    deleteStrategy(strategyId, strategyType).then(async (response) => {
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
                // todo 进入我的策略页面
                emits("updateValues", "Mystrategy", "", "");
            }
        }
    });
};

const getToUnlockList = () => {
    getToUnlockStrategyList().then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                toUnlockStrategyList.value = [];
            } else {
                if (res.data) {
                    toUnlockStrategyList.value = res.data;
                }
                useState("toUnlockStrategyList", () => {
                    return res.data;
                });
            }
        }
    });
};

const getToUnlockListById = (strategyId: number) => {
    getToUnlockStrategyListById(strategyId).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                toUnlockStrategyList.value = [];
            } else {
                if (res.data) {
                    toUnlockStrategyList.value = res.data;
                }
                useState("toUnlockStrategyList", () => {
                    return res.data;
                });
            }
        }
    });
};

onMounted(() => {
    console.log("-===");
    console.log(props);
    console.log("====");
    // 关闭button开关
    buttonText.value = "提交";
    isUpdate.value = false;
    getAccounts();
    strategyId.value = props.activeStrategyId;
    strategyType.value = props.activeStrategyType;
    //this.gridStrategyForm.tokenName = this.$route.params.tokenName;
    //this.gridStrategyForm.basePrice = this.$route.params.basePrice;
    if (strategyId.value !== undefined && strategyId.value > 0) {
        getStrategy(strategyId.value, strategyType.value);
        getToUnlockListById(strategyId.value);
        // 打开button开关
        buttonText.value = "更新";
        isUpdate.value = true;
    } else {
        getToUnlockList();
    }
});
</script>
