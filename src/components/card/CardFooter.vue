<template>
	<div
		class="g-card__footer"
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
	'g-card__footer--compact': props.compact,
}));
</script>
