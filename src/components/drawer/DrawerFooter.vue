<template>
	<div class="g-drawer__footer" :class="classes">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	compact?: boolean;
	center?: boolean;
	spaceBetween?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	compact: false,
	center: false,
	spaceBetween: false,
});

const classes = computed(() => ({
	'g-drawer__footer--compact': props.compact,
	'g-drawer__footer--center': props.center,
	'g-drawer__footer--space-between': props.spaceBetween,
}));
</script>
