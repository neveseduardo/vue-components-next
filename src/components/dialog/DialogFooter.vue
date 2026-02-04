<template>
	<div class="g-dialog__footer" :class="classes">
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
	'g-dialog__footer--compact': props.compact,
	'g-dialog__footer--center': props.center,
	'g-dialog__footer--space-between': props.spaceBetween,
}));
</script>
