<template>
	<div
		class="g-alert"
		:class="classes"
	>
		<div class="g-alert__content">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type AlertVariant = 'warning' | 'error' | 'success' | 'info';

interface Props {
	variant?: AlertVariant;
	light?: boolean;
	closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'info',
	light: false,
	closable: false,
});

const emit = defineEmits<{
	(e: 'destroy-alert'): void;
}>();

const classes = computed(() => ({
	[`g-alert--${props.variant}`]: true,
	'is-light': props.light,
	'is-closable': props.closable,
}));
</script>
