<template>
	<div class="g-input" :class="classes">
		<ElInput
			v-bind="$attrs"
			ref="input"
			v-model="mutable"
			class="g-input__field"
			:clearable="clearable"
			:autosize="autosize"
			:step="step"
			:type="typeValue"
			:disabled="disabled"
			@keyup="$emit('keyup', $event)"
			@keydown="$emit('keydown', $event)"
			@keypress="$emit('keypress', $event)"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
		/>
	</div>
</template>

<script setup lang="ts">
import type { ElInput } from 'element-plus';
import { ref, computed, nextTick, type Component } from 'vue';

interface IconProp {
	name?: string
	provide?: string
	type?: string
}

interface Props {
	value?: number | string
	icon?: string | IconProp
	suffix?: boolean
	disabled?: boolean
	type?: 'text' | 'number' | 'email' | 'search' | 'textarea' | 'password'
	label?: string
	labelVariant?: 'in' | 'on' | 'over'
	invalid?: boolean
	step?: number
	loading?: boolean
	autosize?: { minRows: number; maxRows: number } | boolean
	clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	value: '',
	icon: '',
	suffix: false,
	disabled: false,
	type: 'text',
	label: '',
	labelVariant: 'in',
	invalid: false,
	step: 1,
	loading: false,
	autosize: () => ({ minRows: 4, maxRows: 6 }),
	clearable: true,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: number | string): void
	(e: 'input', value: number | string): void
	(e: 'change', value: number | string): void
	(e: 'focus', value: FocusEvent): void
	(e: 'blur'): void
	(e: 'clear', value: number | string): void
	(e: 'keyup', event: KeyboardEvent): void
	(e: 'keydown', event: KeyboardEvent): void
	(e: 'keypress', event: KeyboardEvent): void
	(e: 'search'): void
}>();

const input = ref<Component<typeof ElInput>>();
const focused = ref(false);

const ACCEPTED_TYPES = ['text', 'number', 'email', 'search', 'textarea', 'password'] as const;

const mutable = computed({
	get: () => {
		focused.value = !isEmpty(props.value);
		return props.value;
	},
	set: (value) => {
		emit('update:modelValue', value);
		emit('input', value);
	},
});

const isDisabled = computed(() => props.disabled || props.loading);
const typeValue = computed(() => {
	if (ACCEPTED_TYPES.includes(props.type)) return props.type;
	return 'text';
});

focused.value = !props.value;

const onChange = (value: number | string) => {
	if (!isDisabled.value) {
		emit('change', value);
	}
};

const onFocus = (value: FocusEvent) => {
	if (!isDisabled.value) {
		emit('focus', value);
	}
};

const onBlur = () => {
	nextTick(() => {
		// input.value?.blur();
		focused.value = !isEmpty(mutable.value);
		emit('blur');
	});
};

const onClear = (value: number | string) => {
	emit('clear', value);
	onBlur();
};

const classes = computed(() => ({
	[`g-input--${props.type}`]: props.type,
	[`g-input--${props.labelVariant}`]: props.label,
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	'is-loading': props.loading,
}));

const isEmpty = (value: any): boolean => {
	return value === null || value === undefined || value === '';
};
</script>
