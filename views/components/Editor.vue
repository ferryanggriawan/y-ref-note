<template>
	<floating-menu
		:editor="editor"
		:tippy-options="{ duration: 100 }"
		v-if="editor"
	>
		<div class="floating-menu">
			<button
				@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
			>
				H1
			</button>
			<button
				@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
			>
				H2
			</button>
			<button
				@click="editor.chain().focus().toggleBulletList().run()"
				:class="{ 'is-active': editor.isActive('bulletList') }"
			>
				Bullet list
			</button>
		</div>
	</floating-menu>
	<bubble-menu
		:editor="editor"
		:tippy-options="{ duration: 100 }"
		v-if="editor"
	>
		<div class="bubble-menu">
			<button
				@click="editor.chain().focus().toggleBold().run()"
				:class="{ 'is-active': editor.isActive('bold') }"
			>
				Bold
			</button>
			<button
				@click="editor.chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }"
			>
				Italic
			</button>
			<button
				@click="editor.chain().focus().toggleStrike().run()"
				:class="{ 'is-active': editor.isActive('strike') }"
			>
				Strike
			</button>
		</div>
	</bubble-menu>
	<editor-content :editor="editor" />
</template>

<script>
import StarterKit from "@tiptap/starter-kit"
import { BubbleMenu, Editor, EditorContent, FloatingMenu } from "@tiptap/vue-3"

export default {
	components: {
		EditorContent,
		FloatingMenu,
		BubbleMenu,
	},

	props: {
		modelValue: {
			type: String,
			default: "",
		},
	},

	emits: ["update:modelValue"],

	data() {
		return {
			editor: null,
		}
	},

	watch: {
		modelValue(value) {
			const isSame = this.editor.getHTML() === value
			if (isSame) {
				return
			}

			this.editor.commands.setContent(value, false)
		},
	},

	mounted() {
		this.editor = new Editor({
			extensions: [StarterKit],
			content: this.modelValue,
			editable: true,
			onUpdate: () => {
				this.$emit("update:modelValue", this.editor.getHTML())
			},
		})

		console.log(this.editor)
	},

	beforeUnmount() {
		this.editor.destroy()
	},
}
</script>

<style>
.tiptap:focus-visible {
	outline: 0 !important;
}
</style>
