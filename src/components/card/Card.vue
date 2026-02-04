<template>
	<div
		class="g-card"
		:class="classes"
		@click="onClick"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

interface Props {
	variant?: CardVariant;
	clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	clickable: false,
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const classes = computed(() => ({
	[`g-card--${props.variant}`]: true,
	'g-card--clickable': props.clickable,
}));

const onClick = (e: MouseEvent) => {
	if (props.clickable) {
		emit('click', e);
	}
};
</script>
