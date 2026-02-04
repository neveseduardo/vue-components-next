<template>
	<label
		class="g-checkbox"
		:class="classes"
	>
		<input
			v-model="mutable"
			type="checkbox"
			:indeterminate="indeterminate"
			:disabled="disabled"
			class="g-checkbox__input"
			@change="onChange"
		>
		<span class="g-checkbox__inner" />
		<span class="g-checkbox__label">
			<slot />
		</span>
	</label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	modelValue?: boolean;
	value?: boolean;
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	invalid?: boolean;
	border?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	value: false,
	checked: false,
	indeterminate: false,
	disabled: false,
	invalid: false,
	border: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
	(e: 'input', value: boolean): void;
	(e: 'change', value: boolean): void;
}>();

const mutable = computed({
	get(): boolean {
		return props.modelValue ?? props.value;
	},
	set(value: boolean) {
		if (!props.disabled) {
			emit('update:modelValue', value);
			emit('input', value);
		}
	},
});

const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	'is-checked': mutable.value,
	'is-indeterminate': props.indeterminate,
	['g-checkbox--border']: props.border,
}));

const onChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (!props.disabled) {
		emit('change', target.checked);
	}
};
</script>
