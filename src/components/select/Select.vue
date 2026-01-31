<template>
	<div class="g-select" :class="classes">
		<ElSelect
			:id="selectId"
			ref="select"
			v-model="mutableValue"
			v-bind="$attrs"
			class="g-select__field"
			popper-class="g-select-popper"
			filterable
			:allow-create="allowCreate"
			:clearable="clearable"
			:disabled="isDisabled"
			:multiple="multiple"
			size="large"
			:collapse-tags="collapseTags"
			@change="onChange"
			@focus="onFocus"
			@clear="onClear"
			@visible-change="onVisibleChange"
		>
		<template v-if="options.length">
			<ElOption
				v-for="(item, index) in options"
				:key="item.value + index"
				:label="item.label"
				:value="item.value"
				:disabled="item.disabled"
			/>
		</template>
		</ElSelect>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, useAttrs, watch } from 'vue';
import { ElSelect, ElOption } from 'element-plus';

interface Option {
	label: string;
	value: any;
	disabled?: boolean;
}

interface Props {
	modelValue?: any;
	options?: Option[];
	label?: string;
	labelVariant?: 'in' | 'on' | 'over';
	multiple?: boolean;
	invalid?: boolean;
	disabled?: boolean;
	loading?: boolean;
	collapseTags?: boolean;
	icon?: string | { name: string; provide?: string; type?: string };
	allowCreate?: boolean;
	clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	options: () => [],
	label: '',
	labelVariant: 'in',
	multiple: false,
	invalid: false,
	disabled: false,
	loading: false,
	collapseTags: true,
	icon: '',
	allowCreate: false,
	clearable: true,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void;
	(e: 'change', value: any): void;
	(e: 'focus', value: any): void;
	(e: 'blur', value: any): void;
	(e: 'clear', value: any): void;
	(e: 'visible-change', visible: boolean): void;
}>();

const attrs = useAttrs();
const select = ref<InstanceType<typeof ElSelect>>();
const focused = ref(false);
const tagsHeight = ref(0);
const selectId = computed(() => attrs.id as string || `select-${Math.random().toString(36).substr(2, 9)}`);

const mutableValue = computed({
	get(): any {
		focused.value = !isEmpty(props.modelValue);
		return props.modelValue;
	},
	set(value: any) {
		emit('update:modelValue', value);
	},
});

const isDisabled = computed(() => {
	return props.disabled || props.loading;
});

const onChange = (value: any) => {
	if (!isDisabled.value) {
		emit('change', value);
	}
};

const onFocus = (value: any) => {
	if (!isDisabled.value) {
		focused.value = true;
		emit('focus', value);
	}
};

const onClear = (value: any) => {
	emit('clear', value);
	onBlur();
};

const onBlur = (value: any = null) => {
	emit('blur', value);
	nextTick(() => {
		select.value?.blur();
		focused.value = !isEmpty(mutableValue.value);
	});
};

const onVisibleChange = (visible: boolean) => {
	emit('visible-change', visible);
};

const updateHeight = () => {
	if (props.multiple && select.value) {
		const tagsContainer = (select.value as any).$refs?.tags;
		if (window && tagsContainer) {
			const ro = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const { height } = entry.contentRect;
					tagsHeight.value = height;
				}
			});
			ro.observe(tagsContainer);
		}
	}
};

const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	'is-loading': props.loading,
	'g-select--multiple': props.multiple,
	[`g-select--${props.labelVariant}`]: props.label,
}));

const isEmpty = (value: any): boolean => {
	return value === null || value === undefined || value === '' ||
		(Array.isArray(value) && value.length === 0);
};

watch(() => props.multiple, () => {
	nextTick(() => {
		updateHeight();
	});
}, { immediate: true });

focused.value = !isEmpty(props.modelValue);
</script>
