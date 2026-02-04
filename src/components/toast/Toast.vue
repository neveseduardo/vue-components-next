<template>
	<div
		class="g-toast"
		:class="classes"
	>
		<div class="g-toast__content">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
	position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
	duration?: number;
	closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	position: 'top',
	duration: 3000,
	closable: false,
});

const classes = computed(() => ({
	[`g-toast--${props.variant}`]: props.variant,
	[`g-toast--${props.position}`]: props.position,
	'is-closable': props.closable,
}));
</script>
