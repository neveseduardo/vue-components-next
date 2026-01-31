<template>
	<span
		class="g-badge"
		:class="classes"
		v-bind="attrs"
		@click="onClick"
	>
		<span
			v-if="slots.left"
			class="g-badge__left"
		>
			<slot name="left" />
		</span>

		<span class="g-badge__content">
			<slot />
		</span>

		<span
			v-if="slots.right"
			class="g-badge__right"
		>
			<slot name="right" />
		</span>
	</span>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';

type Size = 'sm' | 'md' | 'lg';
type Variant =
	| 'default'
	| 'primary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info'
	| 'secondary'
	| 'brand';

type Appearance = 'solid' | 'outlined';

interface Props {
	variant?: Variant;
	appearance?: Appearance;
	size?: Size;
	disabled?: boolean;
	is_button?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	appearance: 'solid',
	size: 'md',
	disabled: false,
	is_button: false,
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const attrs = useAttrs();
const slots = useSlots();

const classes = computed(() => ({
	[`g-badge--${props.variant}`]: true,
	[`g-badge--${props.appearance}`]: true,
	[`g-badge--${props.size}`]: true,
	'is-disabled': props.disabled,
}));

const onClick = (e: MouseEvent) => {
	if (!props.is_button) return;
	emit('click', e);
};
</script>
