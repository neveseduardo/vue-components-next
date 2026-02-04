<template>
	<div
		class="g-stepper"
		:class="{ 'vertical': vertical }"
	>
		<StepperMobile
			:steps="processedSteps"
			:current-step="currentStep"
		/>

		<div class="g-stepper-wrapper">
			<div class="g-stepper-desktop">
				<slot
					name="stepsWrapper"
					:steps="processedSteps"
					:current-step="currentStep"
					:go-to-step="goToStep"
					:disabled="disabled"
				>
					<div
						v-for="(step, index) in processedSteps"
						:key="step.id"
						class="step-container"
					>
						<StepperStep
							:disabled="disabled"
							:step="step"
							:index="index"
							:current-step="currentStep"
							@step-click="goToStep"
						/>
					</div>
				</slot>
			</div>

			<div class="step-content-area">
				<slot />
			</div>
		</div>

		<slot
			name="navigation"
			:current-step="currentStep"
			:steps-count="steps.length"
			:processed-steps="processedSteps"
			:previous-step="previousStep"
			:next-step="handleNext"
			:complete="handleCompletion"
			:can-go-next="currentStep < steps.length - 1"
			:can-go-previous="currentStep > 0"
			:is-last-step="currentStep === steps.length - 1"
		>
			<StepperNavigation
				v-if="showNavigation"
				:current-step="currentStep"
				:steps-count="steps.length"
				:disabled="disabled"
				@previous="previousStep"
				@next="handleNext"
				@complete="handleCompletion"
			/>
		</slot>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, reactive } from 'vue';
import StepperStep from './StepperStep.vue';
import StepperMobile from './StepperMobile.vue';
import StepperNavigation from './StepperNavigation.vue';

interface Step {
	id: string;
	title: string;
	description?: string;
	completed?: boolean;
	error?: boolean;
	internalId?: number;
	[key: string]: any;
}

interface ProcessedStep extends Step {
	completed: boolean;
	error?: boolean;
	active: boolean;
	index: number;
}

interface Props {
	initialStep?: number;
	vertical?: boolean;
	disabled?: boolean;
	showNavigation?: boolean;
}

interface Emits {
	(e: 'step-change', stepIndex: number): void;
	(e: 'update-step', stepId: string, updates: Partial<Step>): void;
	(e: 'completed'): void;
	(e: 'before-next', stepIndex: number): Promise<boolean> | boolean;
}

const props = withDefaults(defineProps<Props>(), {
	initialStep: 0,
	vertical: false,
	disabled: false,
	showNavigation: true,
});

const emit = defineEmits<Emits>();

const currentStep = ref(props.initialStep);
const steps = ref<Step[]>([]);
const stepCounter = ref(0);

const processedSteps = computed<ProcessedStep[]>(() =>
	steps.value.map((step, index) => ({
		...step,
		completed: step.completed || index < currentStep.value,
		error: step.error,
		active: index === currentStep.value,
		index: index,
	}))
);

watch(() => props.initialStep, (newVal) => {
	currentStep.value = newVal;
});

const registerStep = (step: Step) => {
	const stepIndex = steps.value.findIndex(s => s.id === step.id);
	if (stepIndex === -1) {
		steps.value.push({
			...step,
			internalId: stepCounter.value++,
		});
	}
};

const unregisterStep = (stepId: string) => {
	const stepIndex = steps.value.findIndex(s => s.id === stepId);
	if (stepIndex > -1) {
		steps.value.splice(stepIndex, 1);
	}
};

const updateStep = (stepId: string, updates: Partial<Step>) => {
	const stepIndex = steps.value.findIndex(s => s.id === stepId);
	if (stepIndex > -1) {
		steps.value[stepIndex] = { ...steps.value[stepIndex], ...updates };
	}
};

const goToStep = (index: number) => {
	if (index <= currentStep.value) {
		currentStep.value = index;
		emit('step-change', index);
	}
};

const nextStep = () => {
	if (currentStep.value < steps.value.length - 1) {
		currentStep.value++;
		emit('step-change', currentStep.value);
	}
};

const previousStep = () => {
	if (currentStep.value > 0) {
		currentStep.value--;
		emit('step-change', currentStep.value);
	}
};

const handleNext = async () => {
	const canProceed = await emitBeforeNext();

	if (canProceed) {
		nextStep();
	}
};

const handleCompletion = async () => {
	const canComplete = await emitBeforeNext();

	if (canComplete) {
		emit('completed');
	}
};

const setStepError = (stepId: string, hasError: boolean) => {
	const stepIndex = steps.value.findIndex(s => s.id === stepId);

	if (stepIndex > -1) {
		steps.value[stepIndex].error = hasError;
	}
};

const emitBeforeNext = async (): Promise<boolean> => {
	const result = emit('before-next', currentStep.value);

	if (result instanceof Promise) {
		try {
			const resolved = await result;
			return resolved !== false;
		} catch (error) {
			console.error('Erro na validação before-next:', error);
			return false;
		}
	}

	return result !== false;
};

const stepperContext = reactive({
	currentStep: () => currentStep.value,
	steps: () => steps.value,
	processedSteps: () => processedSteps.value,
	goToStep,
	nextStep,
	previousStep,
	updateStep,
	registerStep,
	unregisterStep,
	markStepCompleted: (stepId: string) => {
		updateStep(stepId, { completed: true });
	},
});

provide('stepper', stepperContext);

defineExpose({
	registerStep,
	unregisterStep,
	updateStep,
	goToStep,
	nextStep,
	previousStep,
	setStepError,
	currentStep,
	steps,
});
</script>