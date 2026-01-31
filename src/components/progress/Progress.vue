<template>
	<div class="g-progress" :class="classes">
		<ElProgress
			class="g-progress__element"
			:type="type"
			:percentage="isAnimatable ? animatedValue : percentage"
			:color="colors"
			:stroke-width="strokeWidth"
			:width="width"
			:show-text="showText"
			:text-inside="textInside"
			:stroke-linecap="strokeLinecap"
			:format="format"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { ElProgress } from 'element-plus';

interface Color {
	color: string;
	percentage: number;
}

interface Props {
	percentage?: number;
	type?: 'line' | 'circle' | 'dashboard';
	strokeWidth?: number;
	strokeLinecap?: 'round' | 'butt' | 'square';
	width?: number;
	showText?: boolean;
	textInside?: boolean;
	colors?: Color[];
	format?: (percentage: number) => string;
	animated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	percentage: 0,
	type: 'line',
	strokeWidth: 5,
	strokeLinecap: 'round',
	width: 126,
	showText: true,
	textInside: false,
	colors: () => [
		{ color: '#f56c6c', percentage: 20 },
		{ color: '#e6a23c', percentage: 40 },
		{ color: '#5cb87a', percentage: 60 },
		{ color: '#1989fa', percentage: 80 },
		{ color: '#6f7ad3', percentage: 100 },
	],
	animated: true,
});

const animatedValue = ref(0);

const isAnimatable = computed(() => {
	return props.animated && props.percentage > 0;
});

const animatedProgress = (value: number) => {
	const animate = () => {
		const speed = 300;
		let newValue = 0;
		const initialValue = Number(value);
		const range = initialValue - newValue;
		const step = Math.abs(Math.floor(speed / range));

		const timer = setInterval(() => {
			newValue += 1;
			if (newValue === initialValue) {
				clearInterval(timer);
			}
			animatedValue.value = newValue;
		}, step);
	};
	animate();
};

watch(() => props.percentage, (newValue) => {
	if (isAnimatable.value) {
		animatedValue.value = 0;
		animatedProgress(newValue);
	}
});

const classes = computed(() => ({
	[`g-progress--${props.type}`]: props.type,
	'is-animated': props.animated,
}));

onMounted(() => {
	if (isAnimatable.value) {
		animatedProgress(props.percentage);
	}
});
</script>
