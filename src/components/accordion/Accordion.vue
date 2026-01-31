<template>
	<div
		class="g-accordion"
		:class="{ 'is-open': isOpen }"
	>
		<div
			class="g-accordion__header"
			role="button"
			@click="collapseAccordion"
		>
			<h5 class="g-accordion__title">
				{{ title }}
			</h5>

			<div class="g-accordion__action">
				<slot name="action" />
			</div>

			<div class="g-accordion__arrow">
				<slot name="arrow">
					<button
						class="g-accordion__arrow-button"
						:class="{ 'is-open': isOpen }"
						@click="collapseAccordion"
					>
						<Icon name="ic:baseline-expand-more" />
					</button>
				</slot>
			</div>
		</div>

		<div
			class="g-accordion__body"
			:style="{ maxHeight: isOpen ? maxHeight + 'px' : 0 }"
		>
			<div
				ref="accordionBody"
				class="g-accordion__body-content"
			>
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Icon from '../icon/Icon.vue';

interface Props {
	title?: string;
	maxHeight?: number;
	isArrowIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	title: '',
	maxHeight: 300,
	isArrowIcon: true,
});

const emit = defineEmits<{
	(e: 'toggle-collapse'): void;
}>();

const isOpen = ref(false);

const collapseAccordion = () => {
	isOpen.value = !isOpen.value;
	emit('toggle-collapse');
};
</script>
