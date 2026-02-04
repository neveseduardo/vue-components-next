<template>
	<div
		class="g-card__header"
		:class="classes"
	>
		<slot>
			<h2
				v-if="title"
				class="g-card__title"
			>
				{{ title }}
			</h2>
			<p
				v-if="subtitle"
				class="g-card__subtitle"
			>
				{{ subtitle }}
			</p>
		</slot>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	title?: string;
	subtitle?: string;
	compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	compact: false,
});

const classes = computed(() => ({
	'g-card__header--compact': props.compact,
}));
</script>
