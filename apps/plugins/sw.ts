export default defineNuxtPlugin(async (nuxtApp) => {
	if ("serviceWorker" in navigator) {
		try {
			const url = new URL("@/services/main.sw.js", import.meta.url).href
			const registration = await navigator.serviceWorker.register(url)

			if (registration.installing) {
				console.log("Service worker installing")
			} else if (registration.waiting) {
				console.log("Service worker installed")
			} else if (registration.active) {
				console.log("Service worker active")
			}

			nuxtApp.provide("sw", registration)
		} catch (error) {
			console.error(`Registration failed with ${error}`)
		}
	}
})
