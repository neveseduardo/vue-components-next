<template>
	<button
		class="g-button"
		:class="classes"
		:disabled="disabled"
		:aria-disabled="disabled"
		v-bind="attrs"
		@click="onClick"
	>
		<span
			v-if="slots.left"
			class="g-button__left"
		>
			<slot name="left" />
		</span>

		<span class="g-button__content">
			<slot />
		</span>

		<span
			v-if="slots.right"
			class="g-button__right"
		>
			<slot name="right" />
		</span>
	</button>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
type Variant =
	| 'default'
	| 'neutral'
	| 'brand'
	| 'success'
	| 'error'

type Hierarchy = 'primary' | 'secondary' | 'tercinary' | 'soft';

interface Props {
	variant?: Variant;
	hierarchy?: Hierarchy;
	size?: ButtonSize;
	disabled?: boolean;
	iconOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	hierarchy: 'primary',
	size: 'md',
	disabled: false,
	iconOnly: false,
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const attrs = useAttrs();
const slots = useSlots();

const classes = computed(() => ({
	[`g-button--${props.variant}`]: true,
	[`g-button--${props.hierarchy}`]: true,
	[`g-button--${props.size}`]: true,
	'g-button--disabled': props.disabled,
	'g-button--icon-only': props.iconOnly,
}));

const onClick = (e: MouseEvent) => {
	if (props.disabled) {
		return;
	}

	emit('click', e);
};
</script>
