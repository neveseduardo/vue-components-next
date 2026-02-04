<template>
	<div class="g-stepper-mobile">
		<div class="mobile-header">
			<span class="mobile-title">{{ currentStepTitle }}</span>
			<span class="mobile-progress">Passo {{ currentStep + 1 }} de {{ steps.length }}</span>
		</div>

		<ElProgress
			:percentage="safeProgressPercentage"
			:stroke-width="6"
			:show-text="false"
			:color="progressColor"
			:status="progressStatus"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Step {
	title?: string;
	error?: boolean;
	[key: string]: any;
}

interface Props {
	steps: Step[];
	currentStep: number;
}

const props = defineProps<Props>();

const currentStepTitle = computed(() => props.steps[props.currentStep]?.title || '');

const safeProgressPercentage = computed(() => {
	if (!props.steps.length || props.steps.length === 0) return 0;
	const percentage = ((props.currentStep + 1) / props.steps.length) * 100;
	return Math.min(Math.max(percentage, 0), 100);
});

const currentStepHasError = computed(() => props.steps[props.currentStep]?.error || false);

const isCompleted = computed(() => safeProgressPercentage.value === 100);

const progressColor = computed(() => {
	if (currentStepHasError.value) {
		return '#f56c6c';
	}
	if (isCompleted.value) {
		return '#67c23a';
	}
	return '#409eff';
});

const progressStatus = computed(() => {
	if (currentStepHasError.value) {
		return 'exception';
	}
	if (isCompleted.value) {
		return 'success';
	}
	return undefined;
});
</script>
