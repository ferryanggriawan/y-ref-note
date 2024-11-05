import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	ssr: false,
	devtools: { enabled: true },

	app: {
		head: {
			title: "Y-Ref Note",
			link: [
				{
					rel: "manifest",
					href: "/manifest.json",
				},
			],
		},
	},

	runtimeConfig: {
		public: {
			version: process.env.VERSION,
			mode: process.env.NODE_ENV,
		},
	},

	modules: [
		(_options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) => {
				// @ts-expect-error
				config.plugins.push(vuetify({ autoImport: true }))
			})
		},
	],

	components: {
		dirs: [
			{
				path: "~/views/components",
				global: true,
			},
			{
				path: "~/views/sections",
				global: true,
			},
		],
	},

	dir: {
		pages: "views/pages",
		layouts: "views/layouts",
		plugins: "apps/plugins",
		middleware: "apps/middleware",
	},

	imports: {
		dirs: ["stores", "apps/stores"],
	},

	vite: {
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},

	build: {
		transpile: ["vuetify"],
	},
})
