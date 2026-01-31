<template>
	<ElLink
		class="g-link"
		:class="classes"
		:disabled="disabled"
		:href="href"
		v-bind="attrs"
	>
		<span
			v-if="slots.left"
			class="g-link__left"
		>
			<slot name="left" />
		</span>

		<span class="g-link__content">
			<slot />
		</span>

		<span
			v-if="slots.right"
			class="g-link__right"
		>
			<slot name="right" />
		</span>
	</ElLink>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';
import { ElLink } from 'element-plus';

type LinkType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface Props {
	variant?: LinkType;
	disabled?: boolean;
	href: string;
}

const props = withDefaults(defineProps<Props>(), {
	variant: undefined,
	disabled: false,
});

const attrs = useAttrs();
const slots = useSlots();

const classes = computed(() => ({
	[`g-link--${props.variant}`]: true,
	'is-disabled': props.disabled,
}));
</script>
