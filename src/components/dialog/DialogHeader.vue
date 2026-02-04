<template>
	<div class="g-dialog__header">
		<div class="g-dialog__header-content">
			<h2 v-if="title" class="g-dialog__title">{{ title }}</h2>
			<p v-if="subtitle" class="g-dialog__subtitle">{{ subtitle }}</p>
			<slot />
		</div>
		<slot name="close">
			<slot name="close-trigger" />
		</slot>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title?: string;
	subtitle?: string;
}

withDefaults(defineProps<Props>(), {
	title: '',
	subtitle: '',
});
</script>
