<template>
	<div class="g-tag" :class="classes">
		<ElTag
			class="g-tag__element"
			:size="tagSize"
			:closable="closable"
			:type="tagType"
			@click="onClick"
			@close="onClose"
		>
			<slot />
		</ElTag>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElTag } from 'element-plus';

type TagType = 'success' | 'info' | 'warning' | 'danger';
type TagSize = '' | 'default' | 'small' | 'large';

interface Props {
	type?: TagType;
	size?: TagSize;
	closable?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	type: 'info',
	size: 'default',
	closable: false,
	disabled: false,
});

const emit = defineEmits<{
	(e: 'click', event: Event): void;
	(e: 'close', event: Event): void;
}>();

const tagType = computed(() => {
	return props.type || 'info';
});

const tagSize = computed(() => {
	return props.size || '';
});

const onClick = (event: Event) => {
	if (props.disabled) return;
	emit('click', event);
};

const classes = computed(() => ({
	'is-disabled': props.disabled,
	[`g-tag--${props.type}`]: props.type,
	[`g-tag--${props.size}`]: props.size && props.size !== 'default',
}));

const onClose = (event: Event) => {
	if (props.disabled) return;
	emit('close', event);
};
</script>
