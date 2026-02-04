<template>
	<div class="g-drawer__header">
		<div class="g-drawer__header-content">
			<h2
				v-if="title"
				class="g-drawer__title"
			>
				{{ title }}
			</h2>
			<p
				v-if="subtitle"
				class="g-drawer__subtitle"
			>
				{{ subtitle }}
			</p>
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
