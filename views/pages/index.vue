<template>
	<div>
		<Editor v-model="content"></Editor>
	</div>
</template>

<script setup>
const content = ref()
const db = useDB()
</script>
