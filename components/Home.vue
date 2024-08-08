<template>
    <el-dialog title="选择策略" v-model="selectStrategyVisable">
        <div class="flex justify-center">
            <el-form
                :model="selectStrategyForm"
                label-width="100px"
                class="w-4/5"
            >
                <el-form-item label="策略类型">
                    <el-select
                        v-model="selectStrategyForm.strategyType"
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
                <el-form-item label="代币对">
                    <el-input
                        v-model="selectStrategyForm.tokenName"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input
                        v-model="selectStrategyForm.basePrice"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="my-4 flex justify-center">
            <el-button @click="selectStrategyVisable = false">取 消</el-button>
            <el-button type="primary" @click="toStrategyInfo()"
                >确 定</el-button
            >
        </div>
    </el-dialog>

    <!-- <el-card class="mx-4 my-4">
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
    </el-card> -->
    <el-card class="mx-4 my-4">
        <div class="text-sm py-3">推荐视频</div>
        <el-row :gutter="20">
            <el-col :span="8">
                <iframe
                    src="//player.bilibili.com/player.html?aid=521003978&bvid=BV1FM411z7XJ&cid=918451924&p=1"
                    frameborder="0"
                    allowfullscreen
                >
                </iframe>
                <div class="px-3">
                    <span class="text-sm py-3"
                        >币市投资如何为创业者/老板赋能？</span
                    >
                </div>
            </el-col>
            <el-col :span="8">
                <iframe
                    src="//player.bilibili.com/player.html?aid=491877198&bvid=BV1mN411t78A&cid=1293173516&p=1"
                    frameborder="0"
                    allowfullscreen
                >
                </iframe>
                <div class="px-3">
                    <span class="text-sm py-3"
                        >哪些人可以通过web3新型金融市场拿到结果？</span
                    >
                </div>
            </el-col>
            <el-col :span="8">
                <iframe
                    src="//player.bilibili.com/player.html?aid=1903732540&bvid=BV19m411y71T&cid=1517757908&p=1"
                    scrolling="no"
                    border="0"
                    frameborder="no"
                    framespacing="0"
                    allowfullscreen="true"
                >
                </iframe>
                <div class="px-3">
                    <span class="text-sm py-3">理解时代才能驾驭财富</span>
                </div>
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

            <el-tab-pane label="量化精选">
                <el-table
                    style="width: 100%; font-size: 12px"
                    :data="suggestTokens"
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
                    @current-change="handleSuggestTokenChange"
                    :current-page="suggestTokenPageInfo.pageNo"
                    :page-size="suggestTokenPageInfo.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="suggestTokenPageInfo.dataSize"
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
                                @click="removeUserToken(row)"
                                >取消收藏</el-button
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="选择策略"
                        width="100px"
                        align="center"
                    >
                        <template #default="{ row }">
                            <el-button size="small" @click="selectStrategy(row)"
                                >设置策略</el-button
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
    findMarketTokenPairsByPage,
    findAllGoodTokensByPage,
    findTokenPairListByPage,
    findUserTokenListByPage,
    deleteUserToken,
} from "../server/service/token";
import { IS_HIDES, STRATEGY_TYPES, IS_REWARDUS } from "../server/config/vars";

const selectStrategyVisable = ref(false);
const selectStrategyForm = ref({
    strategyType: "ant3",
    tokenName: "",
    basePrice: "",
});
const emits = defineEmits(["setValues"]);

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

const suggestTokens = ref([]);
const suggestTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

const userTokens = ref([]);
const userTokenPageInfo = ref({ pageNo: 1, pageSize: 10, dataSize: 100 });

const tabValue = ref("BA");

// 选择策略
const selectStrategy = (val: object) => {
    selectStrategyForm.value = {
        strategyType: "ant",
        tokenName: val.tokenName,
        basePrice: val.price,
    };
    selectStrategyVisable.value = true;
};

// 进入某个策略的详情
const toStrategyInfo = () => {
    // 向父页面传递数据
    emits(
        "setValues",
        "Setstrategy",
        selectStrategyForm.value.strategyType,
        selectStrategyForm.value.tokenName,
        selectStrategyForm.value.basePrice
    );
};

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
        tabValue.value = "SUGGEST";
        findSuggestTokensByPage();
    } else if (val == 6) {
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
    } else if (tabValue.value == "SUGGEST") {
        findSuggestTokensByPage();
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

const handleSuggestTokenChange = (val: number) => {
    suggestTokenPageInfo.value.pageNo = val;
    findSuggestTokensByPage();
};

const handleUserTokenChange = (val: number) => {
    userTokenPageInfo.value.pageNo = val;
    findUserTokensByPage();
};

const findHuobiListByPage = () => {
    findMarketTokenPairsByPage(
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
    findMarketTokenPairsByPage(
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
    findMarketTokenPairsByPage(
        { platform: "okex" },
        okTokenPageInfo.value
    ).then(async (response) => {
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
    });
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

const findSuggestTokensByPage = () => {
    findTokenPairListByPage({ isSuggest: 1 }, suggestTokenPageInfo.value).then(
        async (response) => {
            if (response && response.data) {
                let res = response.data;
                console.log(res);
                if (res.code != 0) {
                    ElMessage({
                        message: res.message,
                        type: "error",
                    });
                    suggestTokens.value = [];
                } else {
                    if (res.data) {
                        suggestTokens.value = res.data.dataList;
                        suggestTokenPageInfo.value = res.data;
                    }
                    useState("suggestTokens", () => {
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
        tokenName: val.tokenName,
        instId: val.instId,
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
