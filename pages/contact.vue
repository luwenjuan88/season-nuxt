<style scoped>
.bg-yellow {
    background-color: #fff8f2;
}
.section-bg {
    background: linear-gradient(
        180deg,
        #fff8f2 0%,
        rgba(255, 248, 242, 0.69) 100%
    );
}
p {
    margin: 20px 0px;
}
</style>
<template>
    <div>
        <Nav class="bg-yellow" />
        <div
            class="max-w-screen-xl m-auto px-4 lg:px-10 pt-10 pb-20 text-gray-500 mt-20"
        >
            <div class="text-4xl text-black">沟通建议</div>
            <p>微信(请备注: season)：931186511</p>
        </div>
        <Footer class="fixed w-full bottom-0"></Footer>
    </div>
</template>

<script>
export default {
    name: "contact",
    head() {
        return {
            title: "联系我们 - luyuedan.com",
        };
    },
};
</script>
