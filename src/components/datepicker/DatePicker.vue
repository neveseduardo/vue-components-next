<template>
	<InputWrapper
		:label="label"
		:label-variant="labelVariant === 'in' ? 'floating' : labelVariant"
		:focused="focus"
		:has-value="!isEmpty(mutableValue)"
		:disabled="disabled"
		:loading="loading"
		:size="size"
	>
		<ElDatePicker
			:id="datePickerId"
			ref="input"
			v-model="mutableValue"
			v-bind="$attrs"
			class="g-date-picker__field"
			:type="type"
			:picker-options="pickerOptions"
			:format="format"
			:value-format="outputFormat"
			:disabled="disabled"
			:popper-class="type"
			@focus="onFocus"
			@input="onBlur"
			@blur="onBlur"
			@change="onChange"
		/>
	</InputWrapper>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, nextTick } from 'vue';
import { ElDatePicker } from 'element-plus';
import InputWrapper from '../inputwrapper/InputWrapper.vue';

interface Props {
	modelValue?: string | number | (string | number)[];
	disabled?: boolean;
	type?: 'date' | 'daterange' | 'year' | 'month';
	label?: string;
	labelVariant?: 'floating' | 'static' | 'placeholder';
	loading?: boolean;
	hiddenFilter?: boolean;
	pickerOptions?: any;
	suffix?: boolean;
	size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	disabled: false,
	type: 'date',
	label: '',
	labelVariant: 'floating',
	loading: false,
	hiddenFilter: false,
	pickerOptions: () => ({
		disabledDate(time: Date) {
			return new Date(time).getDay() === 0 || new Date(time).getDay() === 6;
		},
	}),
	suffix: true,
	size: 'md',
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void;
	(e: 'focus', value: any): void;
	(e: 'blur', value: any): void;
	(e: 'change', value: any): void;
}>();

const attrs = useAttrs();
// const input = ref<InstanceType<typeof ElDatePicker>>();
const focus = ref(false);
const focused = ref(false);
const datePickerId = computed(() => attrs.id as string || `date-picker-${Math.random().toString(36).substr(2, 9)}`);

const mutableValue = computed({
	get(): any {
		focused.value = !isEmpty(props.modelValue);
		return props.modelValue;
	},
	set(value: any) {
		emit('update:modelValue', value);
	},
});

const format = computed(() => {
	const type = props.type;
	if (type === 'year') return 'yyyy';
	if (type === 'month') return 'MMMM \'de\' yyyy';
	return 'dd/MM/yyyy';
});

const outputFormat = computed(() => {
	const type = props.type;
	if (type === 'year') return 'yyyy';
	if (type === 'month') return 'yyyy-MM';
	return 'yyyy-MM-dd';
});

const onFocus = (value: any) => {
	if (!props.disabled) {
		focus.value = true;
		emit('focus', value);
	}
};

const onBlur = () => {
	nextTick(() => {
		// input.value?.blur();
		focus.value = false;
		focused.value = !isEmpty(mutableValue.value);
	});
};

const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-loading': props.loading,
	[`g-date-picker--${props.type}`]: props.type !== 'date',
	[`g-date-picker--${props.size}`]: props.size !== 'md',
}));

const onChange = (value: any) => {
	if (!props.disabled) {
		emit('change', value);
	}
};

const isEmpty = (value: any): boolean => {
	return value === null || value === undefined || value === '' ||
		(Array.isArray(value) && value.length === 0);
};

focused.value = !isEmpty(props.modelValue);
</script>
