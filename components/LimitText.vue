<template>
    <div>
        <div class="text-blue-800 text-sm font-bold py-2">卖出逻辑：</div>
        <div class="text-xs py-2">
            当价格高于({{ strategyForm.basePrice }})时，卖出({{
                strategyForm.amount
            }})数量的代币
        </div>
        <div class="text-blue-800 text-sm font-bold py-2">买入逻辑：</div>
        <div class="text-xs py-2">
            当价格低于({{ strategyForm.basePrice }})时，买入({{
                strategyForm.amount
            }})数量的代币
        </div>
        <div class="text-blue-800 text-sm font-bold py-2">注：</div>
        <div class="text-xs py-2">
            采用限价追踪，是指当价格下跌达到买入价格时，并不立刻买入，而是等它继续跌到底部，有0.1%的回调才买入；
        </div>
        <div class="text-xs py-2">
            同样对于卖出，是指当价格上涨达到卖出价格时，并不立刻卖出，而是等它继续涨到顶部，有0.1%的回调才卖出；
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
