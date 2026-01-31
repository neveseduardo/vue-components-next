<template>
	<div class="g-dropdown" :class="classes">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	variant?: 'default' | 'click' | 'hover';
	position?: 'bottom' | 'top' | 'left' | 'right';
	disabled?: boolean;
	trigger?: 'click' | 'hover' | 'focus';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	position: 'bottom',
	disabled: false,
	trigger: 'click',
});

const classes = computed(() => ({
	[`g-dropdown--${props.variant}`]: props.variant,
	[`g-dropdown--${props.position}`]: props.position,
	[`g-dropdown--${props.trigger}`]: props.trigger,
	'is-disabled': props.disabled,
}));
</script>
