<template>
    <div>
        <div class="text-blue-800 text-sm font-bold py-2">策略逻辑：</div>
        <div class="text-xs py-2">
            当价格达到起始价格（{{
                strategyForm.basePrice
            }}），开始按照起始数量（{{ strategyForm.amount }}）建首仓
        </div>
        <div class="text-xs py-2">
            接下来，当价格每下降（{{ strategyForm.priceRatio }}），购买（{{
                strategyForm.amount
            }}）数量代币，价格每上涨（{{ strategyForm.priceRatio }}），卖出（{{
                strategyForm.amount
            }}）数量代币
        </div>
        <div class="text-xs py-2">
            当网格超过（{{ strategyForm.gridNum }}）个，则不再继续购买
        </div>
        <div class="text-xs py-2">
            在任何时候，当价格上涨，盈利达到（{{
                strategyForm.profitRatio
            }}），卖出全部仓位，等待下一次建仓
        </div>
        <div class="text-blue-800 text-sm font-bold py-2">注：</div>
        <div class="text-xs py-2">（1）该策略谨慎买山寨</div>
        <div class="text-xs py-2">（2）做好仓位管理，分散板块</div>
        <div class="text-xs py-2">（3）适用于你看好的币种，需要埋伏的情况</div>
        <div class="text-xs py-2">
            （4）初期埋伏不设止损，涨起来后要上移保护，留住利润
        </div>
    </div>
</template>

<script setup lang="ts">
// 接收从父组件传来的变量formData
const props = defineProps({
    formData: Object,
});

const strategyForm = ref({});

onMounted(() => {
    console.log(props);
    strategyForm.value = props.formData;
});
</script>
