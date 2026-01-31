<template>
	<div class="g-dialog" :class="classes">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	variant?: 'default' | 'modal' | 'drawer';
	size?: 'sm' | 'md' | 'lg' | 'xl';
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	size: 'md',
	disabled: false,
});

const classes = computed(() => ({
	[`g-dialog--${props.variant}`]: props.variant,
	[`g-dialog--${props.size}`]: props.size,
	'is-disabled': props.disabled,
}));
</script>
