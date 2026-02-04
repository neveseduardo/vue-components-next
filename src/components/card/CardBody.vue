<template>
	<div class="g-card__body" :class="classes">
		<slot>
			<p v-if="text" class="g-card__description">{{ text }}</p>
		</slot>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	text?: string;
	compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	compact: false,
});

const classes = computed(() => ({
	'g-card__body--compact': props.compact,
}));
</script>
