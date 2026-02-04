<template>
	<label
		class="g-radio"
		:class="classes"
	>
		<input
			v-model="mutable"
			type="radio"
			:value="value"
			:name="name"
			:disabled="disabled"
			class="g-radio__input"
			@change="onChange"
		>
		<span class="g-radio__inner" />
		<span class="g-radio__label">
			<slot />
		</span>
	</label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	modelValue?: string | boolean | number;
	value: string | boolean | number;
	name?: string;
	disabled?: boolean;
	invalid?: boolean;
	border?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	invalid: false,
	border: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string | boolean | number): void;
	(e: 'input', value: string | boolean | number): void;
	(e: 'change', value: string | boolean | number): void;
}>();

const mutable = computed({
	get(): string | boolean | number | undefined {
		return props.modelValue;
	},
	set(value: string | boolean | number | undefined) {
		if (!props.disabled) {
			emit('update:modelValue', value ?? '');
			emit('input', value ?? '');
		}
	},
});

const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	'is-checked': props.modelValue === props.value,
	['g-radio--border']: props.border,
}));

const onChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (!props.disabled) {
		const value = target.value === 'true' ? true : target.value === 'false' ? false : target.value;
		emit('change', value);
	}
};
</script>
