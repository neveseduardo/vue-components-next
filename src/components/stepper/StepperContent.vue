<template>
	<div class="step-content-area">
		<slot
			:step="currentStepData"
			:step-index="currentStep"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Step {
	[key: string]: any;
}

interface Props {
	steps: Step[];
	currentStep: number;
}

const props = defineProps<Props>();

const currentStepData = computed(() => props.steps[props.currentStep]);
</script>
