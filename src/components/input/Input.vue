<template>
	<InputWrapper
		:label="displayLabel"
		:label-variant="labelVariant"
		:variant="variant"
		:focused="focused"
		:has-value="hasValue"
		:disabled="disabled"
		:invalid="invalid"
		:size="size"
		:loading="loading"
	>
		<template #left v-if="slots.left">
			<slot name="left" />
		</template>

		<input
			:id="inputId"
			ref="input"
			v-model="mutable"
			class="g-input"
			:class="inputClasses"
			:type="typeValue"
			:disabled="isDisabled"
			:placeholder="computedPlaceholder"
			v-bind="filteredAttrs"
			@keyup="$emit('keyup', $event)"
			@keydown="$emit('keydown', $event)"
			@keypress="$emit('keypress', $event)"
			@input="onInput"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
		>

		<template #right v-if="slots.right || clearable || loading">
			<slot name="right" />
			<button
				v-if="clearable && hasValue && !disabled"
				type="button"
				class="g-input__clear"
				@click="clear"
			>
				×
			</button>
			<div
				v-else-if="loading"
				class="g-input__spinner"
			/>
		</template>
	</InputWrapper>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, useAttrs, useId, useSlots } from 'vue';
import InputWrapper from '../inputwrapper/InputWrapper.vue';

type InputSize = 'sm' | 'md' | 'lg';
type InputType = 'text' | 'number' | 'email' | 'search' | 'password';
type LabelVariant = 'floating' | 'static' | 'placeholder';

interface Props {
	modelValue?: number | string
	value?: number | string
	disabled?: boolean
	type?: InputType
	label?: string
	placeholder?: string
	labelVariant?: LabelVariant
	variant?: 'default' | 'neutral'
	invalid?: boolean
	loading?: boolean
	size?: InputSize
	clearable?: boolean
	id?: string
	readonly?: boolean
	required?: boolean
	maxlength?: number
	minlength?: number
	pattern?: string
	min?: number | string
	max?: number | string
	step?: number | string
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	value: '',
	disabled: false,
	type: 'text',
	label: '',
	placeholder: '',
	labelVariant: 'placeholder',
	variant: 'default',
	invalid: false,
	size: 'md',
	clearable: true,
	readonly: false,
	required: false,
});

const attrs = useAttrs();
const slots = useSlots();
const inputId = props.id || useId();

const emit = defineEmits<{
	(e: 'update:modelValue', value: number | string): void
	(e: 'input', value: number | string): void
	(e: 'change', value: number | string): void
	(e: 'focus', event: FocusEvent): void
	(e: 'blur'): void
	(e: 'clear'): void
	(e: 'keyup', event: KeyboardEvent): void
	(e: 'keydown', event: KeyboardEvent): void
	(e: 'keypress', event: KeyboardEvent): void
	(e: 'search'): void
}>();

const input = ref<HTMLInputElement>();
const focused = ref(false);

const ACCEPTED_TYPES: InputType[] = ['text', 'number', 'email', 'search', 'password'];

const mutable = computed({
	get: () => props.modelValue || props.value,
	set: (value) => {
		emit('update:modelValue', value);
		emit('input', value);
	},
});

const hasValue = computed(() => !isEmpty(mutable.value));
const isDisabled = computed(() => props.disabled || props.loading);
const typeValue = computed(() => {
	return ACCEPTED_TYPES.includes(props.type) ? props.type : 'text';
});

const displayLabel = computed(() => {
	if (!props.label) return '';
	return props.label;
});

const computedPlaceholder = computed(() => {
	if (props.labelVariant === 'floating' && props.label) {
		return '';
	}
	return props.placeholder;
});

const filteredAttrs = computed(() => {
	const { class: _, style: __, ...rest } = attrs;
	return rest;
});

const inputClasses = computed(() => ({
	[`g-input--${props.type}`]: props.type,
	'is-disabled': isDisabled.value,
	'is-invalid': props.invalid,
	'is-loading': props.loading,
	'has-left-slot': !!slots.left,
	'has-right-slot': !!slots.right,
}));

const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const value = target.value;
	focused.value = true;
	emit('input', value);
};

const onChange = (event: Event) => {
	if (!isDisabled.value) {
		const target = event.target as HTMLInputElement;
		emit('change', target.value);
	}
};

const onFocus = (event: FocusEvent) => {
	if (!isDisabled.value) {
		focused.value = true;
		emit('focus', event);
	}
};

const onBlur = () => {
	nextTick(() => {
		focused.value = false;
		emit('blur');
	});
};

const clear = () => {
	mutable.value = '';
	emit('clear');
};

const focus = () => {
	input.value?.focus();
};

const blur = () => {
	input.value?.blur();
};

const select = () => {
	input.value?.select();
};

defineExpose({
	focus,
	blur,
	select,
	input,
});

const isEmpty = (value: any): boolean => {
	return value === null || value === undefined || value === '';
};
</script>
