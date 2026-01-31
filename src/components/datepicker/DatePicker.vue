<template>
	<div class="g-date-picker" :class="classes">
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
	</div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, nextTick } from 'vue';
import { ElDatePicker } from 'element-plus';

interface Props {
	modelValue?: string | number | (string | number)[];
	disabled?: boolean;
	type?: 'date' | 'daterange' | 'year' | 'month';
	label?: string;
	labelVariant?: 'in' | 'on' | 'over';
	loading?: boolean;
	hiddenFilter?: boolean;
	pickerOptions?: any;
	suffix?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	disabled: false,
	type: 'date',
	label: '',
	labelVariant: 'in',
	loading: false,
	hiddenFilter: false,
	pickerOptions: () => ({
		disabledDate(time: Date) {
			return new Date(time).getDay() === 0 || new Date(time).getDay() === 6;
		},
	}),
	suffix: true,
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
const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-loading': props.loading,
	[`g-date-picker--${props.type}`]: props.type,
	[`g-date-picker--${props.labelVariant}`]: props.label,
}));

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
	[`g-date-picker--${props.type}`]: props.type,
	[`g-date-picker--${props.labelVariant}`]: props.label,
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
