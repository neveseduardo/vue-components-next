<template>
	<button
		class="g-button"
		:class="classes"
		:disabled="disabled || loading"
		:aria-busy="loading || undefined"
		:aria-disabled="disabled || loading || undefined"
		v-bind="attrs"
		@click="onClick"
	>
		<template v-if="loading">
			<slot name="loading">
				<span
					class="g-button__spinner"
					aria-hidden="true"
				/>
			</slot>
		</template>

		<template v-else>
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
		</template>
	</button>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';

type ButtonSize = 'sm' | 'md' | 'lg';
type Variant =
	| 'default'
	| 'primary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info'
	| 'secondary'
	| 'link'
	| 'link-neutral'
	| 'brand';

type Appearance = 'solid' | 'outlined';

interface Props {
	variant?: Variant;
	appearance?: Appearance;
	size?: ButtonSize;
	rounded?: boolean;
	loading?: boolean;
	disabled?: boolean;
	iconOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	appearance: 'solid',
	size: 'md',
	rounded: false,
	loading: false,
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
	[`g-button--${props.appearance}`]: true,
	[`g-button--${props.size}`]: true,
	'is-loading': props.loading,
	'is-disabled': props.disabled,
	'is-rounded': props.rounded,
	'is-icon-only': props.iconOnly,
}));

const onClick = (e: MouseEvent) => {
	if (props.disabled || props.loading) return;
	emit('click', e);
};
</script>
