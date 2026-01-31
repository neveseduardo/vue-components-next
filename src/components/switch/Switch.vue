<template>
	<div class="g-switch" :class="classes">
		<ElSwitch
			v-bind="$attrs"
			v-model="mutable"
			class="g-switch__input"
			:active-text="text.active"
			:inactive-text="text.inactive"
			:disabled="disabled"
			@change="onChange"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElSwitch } from 'element-plus';

interface SwitchText {
	active: string
	inactive: string
}

interface Props {
	value: boolean
	disabled?: boolean
	text?: SwitchText
	small?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	text: () => ({ active: 'Sim', inactive: 'Não' }),
	small: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
	(e: 'input', value: boolean): void
	(e: 'change', value: number | string | boolean): void
}>();

const mutable = computed({
	get: () => props.value,
	set: (value) => {
		if (!props.disabled) {
			emit('update:modelValue', value);
			emit('input', value);
		}
	},
});

const classes = computed(() => ({
	'is-disabled': props.disabled,
	'g-switch--small': props.small,
}));

const onChange = (value: number | string | boolean) => {
	if (!props.disabled) {
		emit('change', value);
	}
};
</script>
