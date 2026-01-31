<template>
	<div class="g-stepper-desktop">
		<div
			v-for="(step, index) in steps"
			:key="step.id"
			class="step-container"
		>
			<div class="step-content">
				<div
					v-if="index > 0"
					class="connector"
					:class="getConnectorClass(index)"
				/>

				<StepperStep
					:step="step"
					:index="index"
					:current-step="currentStep"
					:clickable="isStepClickable(index)"
					@step-click="goToStep"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import StepperStep from './StepperStep.vue';

interface Step {
	completed?: boolean;
	error?: boolean;
	id: string;
	[key: string]: any;
}

interface Props {
	steps: Step[];
	currentStep: number;
}

interface Emits {
	(e: 'step-click', index: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const getConnectorClass = (index: number) => {
	return {
		'completed': index <= props.currentStep,
		'active': index === props.currentStep,
		'error': props.steps[index]?.error,
	};
};

const isStepClickable = (index: number) => {
	return props.steps[index]?.completed || index < props.currentStep;
};

const goToStep = (index: number) => {
	emit('step-click', index);
};
</script>