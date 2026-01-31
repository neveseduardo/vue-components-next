<template>
	<div
		class="step-content"
		:class="{ 'disabled': disabled }"
	>
		<div
			v-if="index > 0"
			class="connector"
			:class="getConnectorClass(index)"
		/>

		<div
			class="step-circle"
			:class="getStepClass"
			@click="handleClick"
		>
			<StepIcon
				:step="step"
				:index="index"
			/>
		</div>

		<div class="step-label">
			<span class="step-title">{{ step.title }}</span>
			<span
				v-if="step.description"
				class="step-description"
			>
				{{ step.description }}
				<span
					v-if="step.error"
					class="step-error"
				> (ERRO)</span>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StepIcon from './StepIcon.vue';

interface Step {
	completed?: boolean;
	error?: boolean;
	title?: string;
	description?: string;
	[key: string]: any;
}

interface Props {
	step: Step;
	index: number;
	currentStep: number;
	disabled: boolean;
}

interface Emits {
	(e: 'step-click', index: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isClickable = computed(() => props.step.completed || props.index < props.currentStep);

const getStepClass = computed(() => {
	if (props.step.error) {
		return {
			'error': true,
			'active': props.index === props.currentStep,
			'clickable': props.index <= props.currentStep,
		};
	}

	return {
		'completed': props.step.completed && !props.step.error,
		'active': props.index === props.currentStep,
		'pending': !props.step.completed && props.index !== props.currentStep && !props.step.error,
		'clickable': props.index <= props.currentStep,
	};
});

const getConnectorClass = (index: number) => {
	const hasError = props.step.error;

	return {
		'completed': index <= props.currentStep && !hasError,
		'active': index === props.currentStep && !hasError,
		'error': hasError,
	};
};

const handleClick = () => {
	if (isClickable.value && !props.disabled) {
		emit('step-click', props.index);
	}
};
</script>