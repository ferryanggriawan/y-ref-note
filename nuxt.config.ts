import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	ssr: false,
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			version: process.env.VERSION,
			mode: process.env.NODE_ENV,
		},
	},

	modules: [
		"@vite-pwa/nuxt",
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
		],
	},

	dir: {
		pages: "views/pages",
		layouts: "views/layouts",
		plugins: "apps/plugins",
		middleware: "apps/middleware",
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

	pwa: {
		injectRegister: "auto",
		includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
		devOptions: {
			enabled: true,
		},
		manifest: {
			name: "Y-REF Note",
			short_name: "MyApp",
			description: "Y-REF Note description",
			theme_color: "#ffffff",
			icons: [
				{
					src: "pwa-192x192.png",
					sizes: "192x192",
					type: "image/png",
				},
				{
					src: "pwa-512x512.png",
					sizes: "512x512",
					type: "image/png",
				},
			],
		},
	},
})
