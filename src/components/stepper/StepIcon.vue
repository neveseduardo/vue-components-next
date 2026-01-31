<template>
	<div class="step-icon">
		<Icon
			v-if="step.completed"
			name="ic:baseline-check"
		/>
	</div>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';

interface Step {
	completed?: boolean;
	[key: string]: any;
}

interface Props {
	step: Step;
	index: number;
}

defineProps<Props>();
</script>
