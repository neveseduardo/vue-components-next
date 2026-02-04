<template>
	<div
		class="g-dialog__body"
		:class="classes"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	compact: false,
});

const classes = computed(() => ({
	'g-dialog__body--compact': props.compact,
}));
</script>
