<template>
    <div>
        <div class="text-blue-800 text-sm font-bold py-2">策略逻辑：</div>
        <div class="text-xs py-2">
            当价格达到起始价格（{{
                strategyForm.basePrice
            }}），开始按照起始数量（{{ strategyForm.amount }}）U建首仓
        </div>
        <div class="text-xs py-2">
            接下来，按照（{{
                strategyForm.priceRatioStr
            }}）%的百分比例划分网格，每到下一个网格，购买对应（{{
                strategyForm.amountStr
            }}）U数量代币
        </div>

        <div class="text-xs py-2">
            当买入仓位超过（{{
                strategyForm.gridNum
            }}）笔，则不再继续购买，等待仓位出仓；
        </div>
        <div class="text-xs py-2">
            在任何时候，当价格上涨，最后一仓的盈利达到（{{
                strategyForm.profitRatio
            }}），则止盈仓位；
        </div>
        <div class="text-xs py-2">
            可以在交易详情中，针对每个具体仓位设置风险控制参数；
        </div>
        <div class="text-blue-800 text-sm font-bold py-2">注：</div>
        <div class="text-xs py-2">（1）该策略谨慎买山寨</div>
        <div class="text-xs py-2">（2）做好仓位管理，分散板块</div>
        <div class="text-xs py-2">（3）适用于你看好的币种，需要埋伏的情况</div>
    </div>
</template>

<script setup lang="ts">
// 接收从父组件传来的变量
const props = defineProps({
    formData: Object,
});

const strategyForm = ref({});

onMounted(() => {
    console.log(props);
    strategyForm.value = props.formData;
});
</script>
