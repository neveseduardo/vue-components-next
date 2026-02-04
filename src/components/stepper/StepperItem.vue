<template>
	<div
		v-show="isActive"
		class="g-stepper-item"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

interface StepperContext {
	currentStep(): number;
	steps(): any[];
	registerStep(step: any): void;
	unregisterStep(stepId: string): void;
}

interface Props {
	name: string;
	title: string;
	description?: string;
	hasError?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	description: '',
	hasError: false,
});

const stepper = inject<StepperContext>('stepper');
const index = ref(-1);

const isActive = computed(() => stepper?.currentStep() === index.value);

const registerStep = () => {
	if (stepper) {
		stepper.registerStep({
			id: props.name,
			title: props.title,
			description: props.description,
			completed: false,
			error: props.hasError,
		});

		nextTick(() => {
			index.value = stepper.steps().findIndex(step => step.id === props.name);
		});
	}
};

onMounted(() => {
	registerStep();
});

onBeforeUnmount(() => {
	if (stepper) {
		stepper.unregisterStep(props.name);
	}
});
</script>
