<template>
	<div
		class="g-radio"
		:class="classes"
	>
		<ElRadio
			v-model="mutable"
			class="g-radio__input"
			:border="border"
			:disabled="disabled"
			:label="label"
			@change="onChange"
		>
			<slot />
		</ElRadio>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElRadio } from 'element-plus';

interface Props {
	value: string | boolean | number;
	label: string;
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
	(e: 'input', value: string | boolean | number): void;
	(e: 'change', value: string | boolean | number | undefined): void;
}>();

const mutable = computed({
	get(): string | boolean | number {
		return props.value;
	},
	set(value: string | boolean | number) {
		if (!props.disabled) {
			emit('input', value);
		}
	},
});

const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	[`g-radio--border`]: props.border,
}));

const onChange = (value: string | boolean | number | undefined) => {
	if (!props.disabled) {
		emit('change', value);
	}
};
</script>
