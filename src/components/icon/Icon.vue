<template>
	<i
		class="g-icon"
		:class="classes"
	>
		<Icon
			:width="size"
			:height="size"
			:icon="icon"
		/>
	</i>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
	icon: { type: String, default: '' },
	size: { type: Number, default: 18 },
});

const classes = computed(() => ({
	[`g-icon--${props.size}`]: props.size !== 18,
}));
</script>
