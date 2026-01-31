<template>
	<div class="g-autocomplete" :class="classes">
		<ElAutocomplete
			:id="autocompleteId"
			ref="input"
			v-model="mutableValue"
			v-bind="$attrs"
			class="g-autocomplete__field"
			:clearable="clearable"
			:placeholder="placeholder"
			:disabled="disabled"
			:fetch-suggestions="fetchSuggestions"
			:value-key="valueKey"
			:trigger-on-focus="false"
			:debounce="delayTyping"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
			@select="onSelect"
			@change="onChange"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, nextTick } from 'vue';
import { ElAutocomplete } from 'element-plus';

interface Suggestion {
	[key: string]: any;
}

interface Props {
	modelValue?: string;
	icon?: string | { name: string; provide?: string; type?: string };
	suffix?: boolean;
	disabled?: boolean;
	label?: string;
	labelVariant?: 'in' | 'on' | 'over';
	placeholder?: string;
	invalid?: boolean;
	loading?: boolean;
	valueKey?: string;
	fetchSuggestions?: (query: string, cb: (suggestions: Suggestion[]) => void) => void;
	delayTyping?: number;
	clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	icon: '',
	suffix: false,
	disabled: false,
	label: '',
	labelVariant: 'in',
	placeholder: '',
	invalid: false,
	loading: false,
	valueKey: 'label',
	fetchSuggestions: () => ({}),
	delayTyping: 600,
	clearable: true,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void;
	(e: 'focus', value: any): void;
	(e: 'blur', value: any): void;
	(e: 'clear'): void;
	(e: 'select', value: Suggestion): void;
	(e: 'change', value: string): void;
}>();

const attrs = useAttrs();
const input = ref<InstanceType<typeof ElAutocomplete>>();
const focused = ref(false);
const autocompleteId = computed(() => attrs.id as string || `autocomplete-${Math.random().toString(36).substr(2, 9)}`);

const mutableValue = computed({
	get(): string {
const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	'is-loading': props.loading,
	[`g-autocomplete--${props.labelVariant}`]: props.label,
}));

focused.value = !isEmpty(props.modelValue);
		return props.modelValue || '';
	},
	set(value: string) {
		emit('update:modelValue', value);
	},
});

const isDisabled = computed(() => {
	return props.disabled || props.loading;
});

const onFocus = (value: any) => {
	if (!isDisabled.value) {
		emit('focus', value);
	}
};

const onBlur = () => {
	nextTick(() => {
		input.value?.blur();
		focused.value = !isEmpty(mutableValue.value);
		emit('blur', input.value);
	});
};

const onClear = () => {
	emit('clear');
};

const onSelect = (value: Suggestion) => {
	emit('select', value);
};

const onChange = () => {
	const TIME_TO_AWAIT_CHANGE = 150;
	setTimeout(() => {
		emit('change', mutableValue.value);
	}, TIME_TO_AWAIT_CHANGE);
};

const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	'is-loading': props.loading,
	[`g-autocomplete--${props.labelVariant}`]: props.label,
}));

const isEmpty = (value: any): boolean => {
	return value === null || value === undefined || value === '';
};

focused.value = !isEmpty(props.modelValue);
</script>
