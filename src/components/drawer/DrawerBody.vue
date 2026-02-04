<template>
	<div
		class="g-drawer__body"
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
	'g-drawer__body--compact': props.compact,
}));
</script>
