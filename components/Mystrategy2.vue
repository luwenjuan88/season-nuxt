<template>
    <el-dialog title="交易日志" v-model="tradeDialogVisible" width="80%">
        <div class="text-xs py-2">币种：{{ tradeInfo.instId }}</div>
        <el-row :gutter="20">
            <el-col :span="6"
                ><div class="grid-content">
                    <div class="text-xs py-2">
                        当前仓位：{{ valueFormat(tradeInfo.currentPos) }}
                    </div>
                    <div class="text-xs py-2">
                        买入单数：{{ valueFormat(tradeInfo.buyNum) }}
                    </div>
                    <div class="text-xs py-2">
                        卖出单数：{{ valueFormat(tradeInfo.sellNum) }}
                    </div>
                    <div class="text-xs py-2">
                        买入均价：{{ valueFormat(tradeInfo.buyAvgPrice) }}
                    </div>
                    <div class="text-xs py-2">
                        当前价格：{{ valueFormat(tradeInfo.currentPrice) }}
                    </div>
                </div></el-col
            >
            <el-col :span="8"
                ><div class="grid-content">
                    <div class="text-xs py-2">
                        当前成本：{{ valueFormat(tradeInfo.currentBuy) }}U
                    </div>
                    <div class="text-xs py-2">
                        买入金额：{{ valueFormat(tradeInfo.buyUsdt) }}U
                    </div>
                    <div class="text-xs py-2">
                        已卖金额：{{ valueFormat(tradeInfo.sellUsdt) }}U
                    </div>
                    <div class="text-xs py-2">
                        浮动盈利：{{ valueFormat(tradeInfo.toReward) }}U
                    </div>
                    <div class="text-xs py-2">
                        待卖金额：{{ valueFormat(tradeInfo.toSell) }}U
                    </div>
                </div></el-col
            >
            <el-col :span="8">
                <el-form
                    label-position="right"
                    label-width="70px"
                    size="small"
                    :model="addTradeForm"
                >
                    <el-form-item label="方 向">
                        <el-select
                            style="width: 100%"
                            v-model="addTradeForm.side"
                            @change="changeTradeValue($event)"
                        >
                            <el-option
                                v-for="v in sideList"
                                :key="v.id"
                                :label="v.name"
                                :value="v.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="价格">
                        <el-input
                            v-model="addTradeForm.price"
                            :disabled="addTradeInfo.isSellAll"
                        ></el-input>
                    </el-form-item> -->

                    <el-form-item v-if="addTradeInfo.ifbuy" label="数量(U)">
                        <el-input v-model="addTradeForm.amountIn"></el-input>
                    </el-form-item>
                    <el-form-item v-else label="数量(币)">
                        <el-input
                            v-model="addTradeForm.amountIn"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: flex-end">
                    <el-button
                        v-if="addTradeInfo.isSellAll && tradeInfo.hasUnlocked"
                        class="button"
                        disabled
                    >
                        {{ addTradeInfo.addtradetext }}
                    </el-button>
                    <el-button
                        v-else-if="addTradeForm.amountIn > 0"
                        class="button"
                        @click="addOneTrade(addTradeForm)"
                        >{{ addTradeInfo.addtradetext }}</el-button
                    ><el-button v-else class="button" disabled>
                        {{ addTradeInfo.addtradetext }}
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="tradeLogs"
            :row-class-name="tableRowClassName"
            style="font-size: 12px"
        >
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
                property="price"
                label="价格"
                width="100px"
            ></el-table-column>
            <el-table-column
                property="side"
                label="类型"
                width="80px"
            ></el-table-column>
            <el-table-column property="amount" label="代币数量">
                <template #default="{ row }">{{
                    row.amount.toFixed(2)
                }}</template>
            </el-table-column>
            <el-table-column
                property="amountIn"
                label="输入数量"
            ></el-table-column>
            <el-table-column
                property="amountOut"
                label="输出数量"
            ></el-table-column>
            <el-table-column property="reward" label="盈利" width="80px">
                <template #default="{ row }">{{
                    row.reward.toFixed(2)
                }}</template>
            </el-table-column>
            <el-table-column property="remark" label="备注"></el-table-column>
            <el-table-column
                property="status"
                label="状态"
                width="50px"
            ></el-table-column>
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
                        @click="sellOne(row)"
                        >设置卖出</el-button
                    >
                    <el-button
                        v-if="row.status === 0"
                        type="text"
                        size="small"
                        @click="cancelOnePendingTrade(row)"
                        >取消</el-button
                    >
                    <el-button
                        v-else-if="row.status === -1"
                        type="text"
                        size="small"
                        @click="cancelOneLimitTrade(row)"
                        >取消</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

    <el-dialog title="仓位日志" v-model="posDialogVisible" width="80%">
        <div class="text-xs py-2">币种：{{ tradeInfo.instId }}</div>
        <el-row :gutter="20">
            <el-col :span="6"
                ><div class="grid-content">
                    <div class="text-xs py-2">
                        当前仓位：{{ valueFormat(tradeInfo.currentPos) }}
                    </div>
                    <div class="text-xs py-2">
                        买入单数：{{ valueFormat(tradeInfo.buyNum) }}
                    </div>
                    <div class="text-xs py-2">
                        卖出单数：{{ valueFormat(tradeInfo.sellNum) }}
                    </div>
                    <div class="text-xs py-2">
                        买入均价：{{ valueFormat(tradeInfo.buyAvgPrice) }}
                    </div>
                    <div class="text-xs py-2">
                        当前价格：{{ valueFormat(tradeInfo.currentPrice) }}
                    </div>
                </div></el-col
            >
            <el-col :span="8"
                ><div class="grid-content">
                    <div class="text-xs py-2">
                        当前成本：{{ valueFormat(tradeInfo.currentBuy) }}U
                    </div>
                    <div class="text-xs py-2">
                        买入金额：{{ valueFormat(tradeInfo.buyUsdt) }}U
                    </div>
                    <div class="text-xs py-2">
                        已卖金额：{{ valueFormat(tradeInfo.sellUsdt) }}U
                    </div>
                    <div class="text-xs py-2">
                        浮动盈利：{{ valueFormat(tradeInfo.toReward) }}U
                    </div>
                    <div class="text-xs py-2">
                        待卖金额：{{ valueFormat(tradeInfo.toSell) }}U
                    </div>
                </div></el-col
            >
            <el-col :span="8">
                <el-form
                    label-position="right"
                    label-width="70px"
                    size="small"
                    :model="addTradeForm"
                >
                    <el-form-item label="方 向">
                        <el-select
                            style="width: 100%"
                            v-model="addTradeForm.side"
                            @change="changeTradeValue($event)"
                        >
                            <el-option
                                v-for="v in sideList"
                                :key="v.id"
                                :label="v.name"
                                :value="v.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input
                            v-model="addTradeForm.price"
                            :disabled="addTradeInfo.isSell"
                        ></el-input>
                    </el-form-item>

                    <el-form-item v-if="addTradeInfo.ifbuy" label="数量(U)">
                        <el-input v-model="addTradeForm.amountU"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-else-if="
                            addTradeForm.side == 'sell' &&
                            tradeInfo.isRewardU == 0
                        "
                        label="数量(U)"
                    >
                        <el-input
                            v-model="currPos.buyAmountIn"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        v-else-if="addTradeForm.side == 'sellAll'"
                        label="数量(币)"
                    >
                        <el-input
                            v-model="addTradeForm.amountT"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item v-else label="数量(币)">
                        <el-input
                            v-model="currPos.buyAmountOut"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: flex-end">
                    <el-button
                        v-if="addTradeInfo.isSellAll && tradeInfo.hasUnlocked"
                        class="button"
                        disabled
                    >
                        {{ addTradeInfo.addtradetext }}
                    </el-button>
                    <el-button
                        v-else-if="
                            addTradeInfo.isSellAll || addTradeInfo.isSell
                        "
                        class="button"
                        @click="addOnePos(addTradeForm)"
                        >{{ addTradeInfo.addtradetext }}
                    </el-button>
                    <el-button
                        v-else-if="
                            addTradeForm.side == 'protect' &&
                            addTradeForm.price > 0
                        "
                        class="button"
                        @click="addOnePos(addTradeForm)"
                        >{{ addTradeInfo.addtradetext }}
                    </el-button>
                    <el-button
                        v-else-if="
                            addTradeForm.side == 'target' &&
                            addTradeForm.price > 0
                        "
                        class="button"
                        @click="addOnePos(addTradeForm)"
                        >{{ addTradeInfo.addtradetext }}
                    </el-button>
                    <el-button
                        v-else-if="
                            addTradeForm.side == 'buy' &&
                            addTradeForm.amountU > 0
                        "
                        class="button"
                        @click="addOnePos(addTradeForm)"
                        >{{ addTradeInfo.addtradetext }}
                    </el-button>
                    <el-button v-else class="button" disabled>
                        {{ addTradeInfo.addtradetext }}
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="posLogs"
            :row-class-name="tableRowClassName"
            style="font-size: 12px"
        >
            <el-table-column label="日志ID" width="80px">
                <template #default="{ row }">
                    <div>{{ row.buyTradeId }}</div>
                    <div>{{ row.sellTradeId ? row.sellTradeId : "" }}</div>
                </template>
            </el-table-column>
            <el-table-column label="日期" width="120px">
                <template #default="{ row }">
                    <div>{{ formatDate(row.createTime) }}</div>
                    <div>{{ formatDate(row.updateTime) }}</div>
                </template>
            </el-table-column>
            <el-table-column label="价格" width="100px">
                <template #default="{ row }">
                    <div>{{ row.buyPrice }}</div>
                    <div>{{ row.sellPrice }}</div>
                </template>
            </el-table-column>
            <el-table-column label="代币" width="100px">
                <template #default="{ row }">
                    <div>
                        {{
                            row.buyAmountOut ? row.buyAmountOut.toFixed(2) : ""
                        }}
                    </div>
                    <div>
                        {{
                            row.sellAmountIn ? row.sellAmountIn.toFixed(2) : ""
                        }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="USDT" width="100px">
                <template #default="{ row }">
                    <div>
                        {{ row.buyAmountIn ? row.buyAmountIn.toFixed(2) : "" }}
                    </div>
                    <div>
                        {{
                            row.sellAmountOut
                                ? row.sellAmountOut.toFixed(2)
                                : ""
                        }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="止盈止损">
                <template #default="{ row }">
                    <div>{{ row.target ? row.target.toFixed(7) : "" }}</div>
                    <div>{{ row.protect ? row.protect.toFixed(7) : "" }}</div>
                </template>
            </el-table-column>
            <el-table-column label="盈利">
                <template #default="{ row }">
                    <div>{{ row.rewardU ? row.rewardU.toFixed(2) : "" }}</div>
                    <div>{{ row.rewardT ? row.rewardT.toFixed(2) : "" }}</div>
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template #default="{ row }">
                    <div>{{ row.remark }}</div>
                    <div>{{ row.posStatus }}</div>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="80px"
                align="center"
            >
                <template #default="{ row }">
                    <el-button
                        v-if="row.posStatus === 0"
                        type="text"
                        size="small"
                        @click="sellOnePos(row)"
                        >设置卖出</el-button
                    >
                    <el-button
                        v-if="row.posStatus < 0"
                        type="text"
                        size="small"
                        @click="cancelOnePosTrade(row)"
                        >取消</el-button
                    >
                    <el-button
                        v-if="row.posStatus > 0"
                        type="text"
                        size="small"
                        @click="deleteOnePosTrade(row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

    <el-card class="mx-4 my-4">
        <el-select
            v-model="strategyStatus"
            @change="changeOption($event)"
            class="mx-2 my-4 text-xs"
        >
            <el-option
                v-for="item in STATUS"
                :key="item.id"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <el-select
            v-model="strategyIsLimit"
            @change="changeOptionLimit($event)"
            class="mx-2 my-4 text-xs"
        >
            <el-option
                v-for="item in IS_LIMITS"
                :key="item.id"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <el-select
            v-model="strategySection"
            @change="changeOptionSection($event)"
            class="mx-2 my-4 text-xs"
        >
            <el-option
                v-for="item in SELECT_SECTIONS"
                :key="item.id"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <el-select
            v-model="strategyRound"
            @change="changeOptionRound($event)"
            class="mx-2 my-4 text-xs"
        >
            <el-option
                v-for="item in roundInfos"
                :key="item.id"
                :label="item.round"
                :value="item.round"
            >
            </el-option>
        </el-select>
        <!-- <el-select
            v-model="strategyIsHide"
            @change="changeOptionHide($event)"
            class="mx-2 my-4 text-xs"
        >
            <el-option
                v-for="item in IS_HIDES"
                :key="item.id"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select> -->
        <el-table
            :data="strategyList"
            border
            stripe
            style="width: 100%; font-size: 12px"
        >
            <el-table-column
                label="序号"
                type="index"
                width="50px"
                align="center"
            />
            <el-table-column
                prop="id"
                width="100px"
                label="策略ID"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="strategyType"
                width="100px"
                label="策略类型"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="tokenName"
                width="100px"
                label="币种名称"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="basePrice"
                width="100px"
                label="基础价格"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="profitRatio"
                width="100px"
                label="止盈比例(%)"
                align="center"
            >
                <template #default="{ row }"
                    >{{ (row.profitRatio * 100).toFixed(2) }}%</template
                >
            </el-table-column>
            <el-table-column
                prop="strategyName"
                label="策略名称"
                align="center"
            >
            </el-table-column>
            <el-table-column
                property="createTime"
                :formatter="dataFormat"
                label="日期"
                width="150px"
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
                        @click="toStrategyInfo(row)"
                        >详情</el-button
                    >
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="getInfo(row)"
                        >交易</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="page"
            style="font-size: 12px"
            @current-change="handleCurrentChange"
            :current-page="strategyPageInfo.pageNo"
            :page-size="strategyPageInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="strategyPageInfo.dataSize"
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
    addTrade,
    findUserStrategyListByPage,
    getStrategyTradeInfo,
    getStrategyPosInfo,
    getCurrentPrice,
    cancelPendingTrade,
    cancelLimitTrade,
    cancelPosTrade,
    setPos,
    deletePosTrade,
    getStrategyRounds,
} from "../server/service/strategy";
import {
    STATUS,
    STRATEGY_TYPES,
    IS_LIMITS,
    IS_HIDES,
    SELECT_SECTIONS,
} from "../server/config/vars";

const router = useRouter();
const emits = defineEmits(["updateValues"]);

const roundInfos = ref([]);
const strategyList = ref([]);
const strategyPageInfo = ref({
    pageNo: 1,
    pageSize: 10,
    dataSize: 100,
    hasMore: false,
});
const strategyStatus = ref(0);
const strategyIsLimit = ref(0);
const strategySection = ref("All");
const strategyIsHide = ref(0);
const strategyRound = ref(0);

const tradeDialogVisible = ref(false);
const tradeLogs = ref([]);
const posDialogVisible = ref(false);
const posLogs = ref([]);
const tradeInfo = ref({
    id: 0,
    instId: "",
    currentPos: 0.0,
    buyNum: 0.0,
    sellNum: 0.0,
    buyAvgPrice: 0.0,
    currentPrice: 0.0,
    currentBuy: 0.0,
    buyUsdt: 0.0,
    sellUsdt: 0.0,
    toReward: 0.0,
    toSell: 0.0,
    hasUnlocked: false,
});

const addTradeForm = ref({
    side: "buy",
    price: 0,
    amountU: 0,
    amountT: 0,
    strategyId: 0,
    strategyType: "",
    unlockId: 0,
});
const currPos = ref({});
const addTradeInfo = ref({
    addtradetext: "加仓",
    amounttext: "数量(U)",
    ifbuy: true,
    isSellAll: false,
    isSell: false,
});

const sideList = ref([
    { id: 1, name: "买", value: "buy" },
    { id: 5, name: "清仓", value: "sellAll" },
]);

const formatDate = (val: number) => {
    return new Date(val).toLocaleString();
};

const dataFormat = (row: [], column: { property: number }) => {
    return new Date(row[column.property]).toLocaleString();
};

const valueFormat = (val: number) => {
    if (val === undefined) {
        return val;
    } else if (val === null) {
        return val;
    } else {
        return val.toFixed(8);
    }
};

const changeOption = (val: number) => {
    console.log(val);
    strategyStatus.value = val;
    getStrategyList();
};

const changeOptionLimit = (val: number) => {
    console.log(val);
    strategyIsLimit.value = val;
    getStrategyList();
};

const changeOptionSection = (val: string) => {
    console.log(val);
    strategySection.value = val;
    getStrategyList();
};

const changeOptionRound = (val: number) => {
    console.log(val);
    strategyRound.value = val;
    getStrategyList();
};

const changeOptionHide = (val: number) => {
    console.log(val);
    strategyIsHide.value = val;
    getStrategyList();
};

const handleCurrentChange = (val: number) => {
    strategyPageInfo.value.pageNo = val;
    getStrategyList();
};

const tableRowClassName = (cellValue: {
    row: { status: number; side: string };
}) => {
    if (
        tradeInfo.strategyType == "ant1" ||
        tradeInfo.strategyType == "ant2" ||
        tradeInfo.strategyType == "ant3" ||
        tradeInfo.strategyType == "ant"
    ) {
        if (cellValue.row.status === 20) {
            return "text-gray-200";
        } else if (cellValue.row.side === "buy") {
            return "";
        } else if (cellValue.row.side === "sell") {
            return "text-red-500";
        } else if (cellValue.row.side === "sellAll") {
            return "text-red-500";
        } else {
            return "";
        }
    } else {
        if (cellValue.row.posStatus === 2) {
            return "text-gray-200";
        } else if (cellValue.row.posStatus === 1) {
            return "text-red-500";
        } else if (cellValue.row.posStatus < 0) {
            return "text-orange-400";
        }
        return "";
    }
};

const changeTradeValue = (val: string) => {
    console.log(val);
    if (val === "buy") {
        addTradeForm.value.amountU = 0;
        addTradeInfo.value = {
            addtradetext: "加仓",
            amounttext: "数量(U)",
            ifbuy: true,
            isSellAll: false,
            isSell: false,
        };
    } else if (val === "sell" && tradeInfo.value.isRewardU == 0) {
        addTradeInfo.value = {
            addtradetext: "减仓",
            amounttext: "数量(U)",
            ifbuy: false,
            isSellAll: false,
            isSell: true,
        };
    } else if (val === "sell") {
        addTradeInfo.value = {
            addtradetext: "减仓",
            amounttext: "数量(币)",
            ifbuy: false,
            isSellAll: false,
            isSell: true,
        };
    } else if (val === "protect") {
        addTradeInfo.value = {
            addtradetext: "保护",
            amounttext: "数量(币)",
            ifbuy: false,
            isSellAll: false,
            isSell: false,
        };
    } else if (val === "target") {
        addTradeInfo.value = {
            addtradetext: "目标",
            amounttext: "数量(币)",
            ifbuy: false,
            isSellAll: false,
            isSell: false,
        };
    } else if (val === "sellAll") {
        addTradeForm.value.amountT = tradeInfo.value.currentPos;
        addTradeInfo.value = {
            addtradetext: "清仓",
            amounttext: "数量(币)",
            ifbuy: false,
            isSellAll: true,
            isSell: true,
        };
    }
};

// 卖掉某一单
// 可以是卖出仓位，也可以是收回成本
const sellOne = (tradeLog: {
    amountIn: number;
    lockedAmount: number;
    id: number;
    strategyType: string;
}) => {
    addTradeForm.value = {
        amountIn: tradeLog.lockedAmount,
        amountOut: tradeLog.amountIn,
        side: "sell",
        price: "",
        strategyId: tradeInfo.value.id,
        strategyType: tradeLog.strategyType,
        unlockId: tradeLog.id,
    };
    addTradeInfo.value = {
        addtradetext: "减仓",
        amounttext: "数量(币)",
        ifbuy: false,
        isSellAll: false,
    };
    sideList.value = [
        { id: 2, name: "卖", value: "sell" },
        //{ id: 3, name: "保护", value: "protect" },
        //{ id: 4, name: "目标", value: "target" },
    ];
};

const sellOnePos = (posLog: object) => {
    currPos.value = posLog;
    addTradeForm.value = {
        amountU: posLog.buyAmountOut,
        amountT: posLog.buyAmountIn,
        side: "sell",
        price: "",
        strategyId: tradeInfo.value.id,
        strategyType: posLog.strategyType,
        unlockId: posLog.id,
    };
    addTradeInfo.value = {
        addtradetext: "减仓",
        amounttext: "数量(币)",
        ifbuy: false,
        isSellAll: false,
        isSell: true,
    };
    sideList.value = [
        { id: 2, name: "卖", value: "sell" },
        { id: 3, name: "保护", value: "protect" },
        { id: 4, name: "目标", value: "target" },
    ];
    console.log("tradeinfo:" + tradeInfo);
    // 收回成本，这里算一下，后端也算一下
    if (tradeInfo.isRewardU == 0) {
        // let newAmount = tradeLog.amountIn / tradeInfo.value.currentPrice;
        // addTradeForm.value.amountIn =
        //     newAmount < tradeLog.lockedAmount
        //         ? newAmount
        //         : tradeLog.lockedAmount;
        // 判断当前价格是否可以收回成本
        if (tradeInfo.value.currentPrice > posLog.buyPrice) {
            // 可以收回成本
            sideList.value = [
                { id: 2, name: "收回成本", value: "sell" }, // 暂时就用sell吧，用策略类型来判断是收回成本还是别的
                { id: 3, name: "保护", value: "protect" },
                { id: 4, name: "目标", value: "target" },
            ];
        } else {
            // 无法收回成本
            sideList.value = [
                { id: 3, name: "保护", value: "protect" },
                { id: 4, name: "目标", value: "target" },
            ];
            addTradeForm.value.side = "protect";
        }

        console.log(addTradeForm.value);
    }
};

// 进入某个策略的详情
const toStrategyInfo = (val: { id: number; strategyType: string }) => {
    // 向父页面传递数据
    emits("updateValues", "Setstrategy", val.id, val.strategyType);
};

const getInfo = (val: object) => {
    console.log("---");
    console.log(val);
    if (
        val.strategyType == "ant" ||
        val.strategyType == "ant1" ||
        val.strategyType === "ant2" ||
        val.strategyType === "ant3"
    ) {
        getTradeInfo(val);
    } else {
        getTradePosInfo(val);
    }
};

// 获取交易详情
const getTradeInfo = (val: object) => {
    getStrategyTradeInfo(val).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                tradeInfo.value = {
                    id: 0,
                    instId: "",
                    currentPos: 0.0,
                    buyNum: 0.0,
                    sellNum: 0.0,
                    buyAvgPrice: 0.0,
                    currentPrice: 0.0,
                    currentBuy: 0.0,
                    buyUsdt: 0.0,
                    sellUsdt: 0.0,
                    toReward: 0.0,
                    toSell: 0.0,
                    hasUnlocked: false,
                };
                tradeLogs.value = [];
            } else {
                if (res.data) {
                    tradeInfo.value = res.data;
                    tradeLogs.value = res.data.tradeLogs;
                }
                useState("tradeInfo", () => {
                    return res.data;
                });
            }
        }
    });
    tradeDialogVisible.value = true;
    // 重新打开时，把参数重置
    addTradeForm.value = {
        amountIn: 0.0,
        amountOut: 0.0,
        price: "",
        side: "buy",
        strategyId: 0,
        strategyType: "",
        unlockId: 0,
    };
    sideList.value = [
        { id: 1, name: "买", value: "buy" },
        { id: 5, name: "清仓", value: "sellAll" },
    ];
    addTradeInfo.value = {
        addtradetext: "加仓",
        amounttext: "数量(U)",
        ifbuy: true,
        isSellAll: false,
    };
    getPrice(val);
};

// 获取仓位详情
const getTradePosInfo = (val: object) => {
    getStrategyPosInfo(val).then(async (response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                tradeInfo.value = {
                    id: 0,
                    instId: "",
                    currentPos: 0.0,
                    buyNum: 0.0,
                    sellNum: 0.0,
                    buyAvgPrice: 0.0,
                    currentPrice: 0.0,
                    currentBuy: 0.0,
                    buyUsdt: 0.0,
                    sellUsdt: 0.0,
                    toReward: 0.0,
                    toSell: 0.0,
                    hasUnlocked: false,
                };
                posLogs.value = [];
            } else {
                if (res.data) {
                    tradeInfo.value = res.data;
                    posLogs.value = res.data.posLogs;
                }
                useState("tradeInfo", () => {
                    return res.data;
                });
            }
        }
    });
    posDialogVisible.value = true;
    // 重新打开时，把参数重置
    addTradeForm.value = {
        amountU: 0.0,
        amountT: 0.0,
        price: "",
        side: "buy",
        strategyId: 0,
        strategyType: "",
        unlockId: 0,
    };
    currPos.value = {};
    sideList.value = [
        { id: 1, name: "买", value: "buy" },
        { id: 5, name: "清仓", value: "sellAll" },
    ];
    addTradeInfo.value = {
        addtradetext: "加仓",
        amounttext: "数量(U)",
        ifbuy: true,
        isSellAll: false,
        isSell: false,
    };
    getPrice(val);
};

// 获取当前价格
const getPrice = (val: object) => {
    getCurrentPrice(val).then((response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                tradeInfo.value.currentPrice = 0;
            } else {
                if (res.data) {
                    tradeInfo.value.currentPrice = res.data;
                    tradeInfo.value.toSell =
                        tradeInfo.value.currentPos *
                        tradeInfo.value.currentPrice;
                    tradeInfo.value.toReward =
                        tradeInfo.value.sellUsdt +
                        tradeInfo.value.toSell -
                        tradeInfo.value.buyUsdt;
                }
                useState("tradeInfo", () => {
                    return res.data;
                });
            }
        }
    });
};

// 提交订单
const addOneTrade = (formData: object) => {
    formData.strategyId = tradeInfo.value.id;
    addTrade(formData).then(async (response) => {
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
                getTradeInfo(tradeInfo.value);
            }
        }
    });
};

// 提交订单
const addOnePos = (formData: object) => {
    formData.strategyId = tradeInfo.value.id;
    if (formData.side == "buy") {
        formData.buyPrice = formData.price;
        formData.buyAmountIn = formData.amountU;
    } else if (formData.side == "sellAll") {
        formData.sellAmountIn = formData.amountT;
    } else if (formData.side == "sell") {
        formData.id = currPos.value.id;
        formData.buyAmountOut = currPos.value.buyAmountOut;
        formData.buyAmountIn = currPos.value.buyAmountIn;
        formData.buyTradeId = currPos.value.buyTradeId;
    } else if (formData.side == "protect") {
        formData.id = currPos.value.id;
        formData.protect = formData.price;
    } else if (formData.side == "target") {
        formData.id = currPos.value.id;
        formData.target = formData.price;
    }

    setPos(formData).then(async (response) => {
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
                //getTradeInfo(tradeInfo.value);
                getTradePosInfo(tradeInfo.value);
            }
        }
    });
};

const cancelOneLimitTrade = (tradeLog: object) => {
    cancelLimitTrade(tradeLog).then(async (response) => {
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
                getTradeInfo(tradeInfo.value);
            }
        }
    });
};

const cancelOnePendingTrade = (tradeLog: object) => {
    cancelPendingTrade(tradeLog).then(async (response) => {
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
                getTradeInfo(tradeInfo.value);
            }
        }
    });
};

// 取消仓位操作
const cancelOnePosTrade = (posLog: object) => {
    cancelPosTrade(posLog).then(async (response) => {
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
                getTradePosInfo(tradeInfo.value);
            }
        }
    });
};

// 删除仓位操作
const deleteOnePosTrade = (posLog: object) => {
    deletePosTrade(posLog).then(async (response) => {
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
                getTradePosInfo(tradeInfo.value);
            }
        }
    });
};

const getStrategyRoundOptions = () => {
    getStrategyRounds().then((response) => {
        if (response && response.data) {
            let res = response.data;
            console.log(res);
            if (res.code > 0) {
                ElMessage({
                    message: res.message,
                    type: "error",
                });
                roundInfos.value = [];
            } else {
                if (res.data) {
                    roundInfos.value = res.data;
                }
                useState("roundInfos", () => {
                    return res.data;
                });
            }
        }
    });
};

// 获取策略列表
const getStrategyList = () => {
    var searchObj = {
        status: strategyStatus.value,
        isLimit: strategyIsLimit.value,
        section: strategySection.value,
        round: strategyRound.value,
        // isHide: strategyIsHide.value,
    };
    if (strategySection.value == "All") {
        searchObj.section = null;
    }
    if (strategyIsLimit.value == 1) {
        searchObj.isHide = null;
    }

    findUserStrategyListByPage(searchObj, strategyPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code != 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    strategyList.value = [];
                } else {
                    if (res.data) {
                        strategyList.value = res.data.dataList;
                        strategyPageInfo.value = res.data;
                    }
                    useState("strategyList", () => {
                        return res.data.dataList;
                    });
                }
            }
        }
    );
};

onMounted(() => {
    getStrategyList();
    getStrategyRoundOptions();
});
</script>
