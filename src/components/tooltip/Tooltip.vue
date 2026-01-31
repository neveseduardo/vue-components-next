<template>
	<div class="g-tooltip" :class="classes">
		<ElTooltip
			class="g-tooltip__element"
			:effect="effect"
			:content="content"
			:placement="placement"
		>
			<slot />
		</ElTooltip>
	</div>
</template>

<script setup lang="ts">
import { ElTooltip } from 'element-plus';

type TooltipPlacement =
	| 'top' | 'top-start' | 'top-end'
	| 'bottom' | 'bottom-start' | 'bottom-end'
	| 'left' | 'left-start' | 'left-end'
	| 'right' | 'right-start' | 'right-end'

type TooltipEffect = 'dark' | 'light'

interface Props {
	effect?: TooltipEffect
	content: string
	placement?: TooltipPlacement
}

const props = withDefaults(defineProps<Props>(), {
	effect: 'dark',
	placement: 'bottom',
});

const classes = computed(() => ({
	[`g-tooltip--${props.effect}`]: props.effect,
	[`g-tooltip--${props.placement}`]: props.placement,
}));
</script>
