<template>
	<div
		class="g-switch"
		:class="classes"
	>
		<div
			class="g-switch__wrapper"
			@click="toggleValue"
		>
			<div
				class="g-switch__track"
				:class="{ 'is-active': mutable }"
			>
				<div
					class="g-switch__thumb"
					:class="{ 'is-active': mutable }"
				/>
			</div>
			<div
				v-if="text"
				class="g-switch__label"
			>
				{{ mutable ? text.active : text.inactive }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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

const toggleValue = () => {
	if (!props.disabled) {
		const newValue = !mutable.value;
		emit('update:modelValue', newValue);
		emit('input', newValue);
		emit('change', newValue);
	}
};
</script>
