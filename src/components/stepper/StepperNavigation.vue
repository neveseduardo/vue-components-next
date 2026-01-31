<template>
	<div class="g-stepper-navigation">
		<div class="g-stepper-navigation-button">
			<g-button
				type="secondary"
				outlined
				:disabled="isFirstStep || disabled"
				icon="arrow_back"
				@click="previousStep"
			>
				Voltar
			</g-button>
		</div>
		<div class="g-stepper-navigation-button">
			<g-button
				v-if="!isLastStep"
				type="primary"
				icon="arrow_forward"
				suffix
				:disabled="disabled"
				@click="nextStep"
			>
				Próximo
			</g-button>

			<g-button
				v-else
				type="success"
				icon="check"
				:disabled="disabled"
				@click="complete"
			>
				Finalizar
			</g-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/Button.vue';

interface Props {
	currentStep: number;
	stepsCount: number;
	disabled: boolean;
}

interface Emits {
	(e: 'previous'): void;
	(e: 'next'): void;
	(e: 'complete'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isFirstStep = computed(() => props.currentStep === 0);

const isLastStep = computed(() => props.currentStep === props.stepsCount - 1);

const previousStep = () => {
	emit('previous');
};

const nextStep = () => {
	emit('next');
};

const complete = () => {
	emit('complete');
};
</script>