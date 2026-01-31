<template>
	<div
		class="g-input-wrapper"
		:class="wrapperClasses"
	>
		<!-- Label flutuante ou acima -->
		<label
			v-if="label"
			:for="inputId"
			class="g-input-wrapper__label"
			:class="labelClasses"
		>
			{{ label }}
		</label>

		<div class="g-input-wrapper__container">
			<div
				v-if="slots.left"
				class="g-input-wrapper--left"
			>
				<slot name="left" />
			</div>

			<div class="g-input-wrapper-content">
				<slot />
			</div>

			<div
				v-if="slots.right"
				class="g-input-wrapper--right"
			>
				<slot name="right" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, useId, useSlots } from 'vue';

interface Props {
	label?: string
	labelVariant?: 'floating' | 'static' | 'placeholder'
	variant?: 'default' | 'neutral'
	focused?: boolean
	hasValue?: boolean
	disabled?: boolean
	invalid?: boolean
	size?: 'sm' | 'md' | 'lg'
	loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	labelVariant: 'placeholder',
	variant: 'default',
	focused: false,
	hasValue: false,
	disabled: false,
	invalid: false,
	size: 'md',
	loading: false,
});

const inputId = useId();
const slots = useSlots();

const wrapperClasses = computed(() => ({
	[`g-input-wrapper--${props.labelVariant}`]: props.labelVariant,
	[`g-input-wrapper--${props.variant}`]: props.variant,
	[`g-input-wrapper--${props.size}`]: props.size,
	'is-focused': props.focused,
	'has-value': props.hasValue,
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	'is-loading': props.loading,
}));

const labelClasses = computed(() => ({
	'is-floating': props.labelVariant === 'floating',
	'is-static': props.labelVariant === 'static',
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
}));
</script>
