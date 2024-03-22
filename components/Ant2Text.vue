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
            }}）%的百分比例划分网格，每到下一个网格，则购买（{{
                strategyForm.amount
            }}）U数量代币
        </div>
        <div class="text-xs py-2">
            当买入仓位超过（{{
                strategyForm.unlockStart
            }}）笔，则启动自我解套机制
        </div>
        <div class="text-xs py-2">
            当买入仓位超过（{{
                strategyForm.gridNum
            }}）笔，则不再继续购买，等待自我解套或者跨币种解套出空余仓位，才会继续购买；
        </div>
        <div class="text-xs py-2">
            在任何时候，当价格上涨，最后一仓的盈利达到（{{
                strategyForm.profitRatio
            }}），则直接止盈卖出该仓位；
        </div>
        <div class="text-blue-800 text-sm font-bold py-2">自我解套机制：</div>
        <div class="text-xs py-2">
            当触发自我解套机制后，最后一个仓位将作为解套基准点，当价格回调（{{
                strategyForm.unlockBackRatio
            }}），则卖出最后一仓，并同时带走第一仓的部分仓位，并保证该笔有（{{
                strategyForm.unlockProfitRatio
            }}）的盈利
        </div>
        <div class="text-blue-800 text-sm font-bold py-2">跨币种解套机制：</div>
        <div class="text-xs py-2">
            当设置了跨币种解套策略后，本策略将优先用于帮助策略（{{
                strategyForm.toUnlockId
            }}）进行解套，只有当策略（{{
                strategyForm.toUnlockId
            }}）已经买满仓位之后，跨币种解套才会触发；
        </div>
        <div class="text-xs py-2">
            当跨币种解套触发后，本策略最后一个仓位将作为解套基准点，当价格回调（{{
                strategyForm.unlockBackRatio
            }}），则卖出最后一仓，并同时带走（{{
                strategyForm.toUnlockId
            }}）策略第一仓的部分仓位，并保证该笔有（{{
                strategyForm.unlockProfitRatio
            }}）的盈利
        </div>
        <div class="text-xs py-2">
            如果策略（{{
                strategyForm.toUnlockId
            }}）解套出来又有了空余仓位可买时，跨币种解套暂时失效
        </div>
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
