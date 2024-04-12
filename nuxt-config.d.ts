import { NuxtConfig } from "@nuxt/types";

declare module "@nuxt/types" {
    interface NuxtConfig {
        head?: {
            title?: string;
            meta?: Array<{ charset?: string; name?: string; content?: string }>;
            link?: Array<{ rel?: string; type?: string; href?: string }>;
        };
    }
}
