<template>
	<div
		class="g-checkbox"
		:class="classes"
	>
		<ElCheckbox
			v-model="mutable"
			class="g-checkbox__input"
			:checked="checked"
			:border="border"
			:disabled="disabled"
			@change="onChange"
		>
			<slot />
		</ElCheckbox>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElCheckbox, type CheckboxValueType } from 'element-plus';

interface Props {
	value?: boolean;
	checked?: boolean;
	disabled?: boolean;
	invalid?: boolean;
	border?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	value: false,
	checked: false,
	disabled: false,
	invalid: false,
	border: false,
});

const emit = defineEmits<{
	(e: 'input', value: boolean): void;
	(e: 'change', value: CheckboxValueType): void;
}>();

const mutable = computed({
	get(): boolean {
		return props.value;
	},
	set(value: boolean) {
		if (!props.disabled) {
			emit('input', value);
		}
	},
});

const classes = computed(() => ({
	'is-disabled': props.disabled,
	'is-invalid': props.invalid,
	[`g-checkbox--border`]: props.border,
}));

const onChange = (value: CheckboxValueType) => {
	if (!props.disabled) {
		emit('change', value);
	}
};
</script>
