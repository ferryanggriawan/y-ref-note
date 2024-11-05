function test() {
	console.log("sw install test")
}

self.addEventListener("install", (event) => {
	event.waitUntil(test())
})

addEventListener("message", (e) => {
	console.log("message from", e)
})
