import ElementPlus from "unplugin-element-plus/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss"],
    // build
    build: {
        transpile: ["element-plus/es"],
    },
    vue: {},
    vite: {
        plugins: [ElementPlus()],
    },
    head: {
        title: "season quant",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width,initial-scale=1" },
            {
                hid: "description",
                name: "description",
                content: "season quant",
            },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }],
    },
});
