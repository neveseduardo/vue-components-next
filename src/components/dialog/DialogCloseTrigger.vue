<template>
	<button
		class="g-dialog__close-trigger"
		:class="{ 'is-disabled': disabled }"
		:disabled="disabled"
		type="button"
		@click="onClick"
	>
		<GIcon icon="mdi:close" class="g-dialog__close-icon" />
	</button>
</template>

<script setup lang="ts">
import GIcon from '../icon/Icon.vue';

interface Props {
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const onClick = (e: MouseEvent) => {
	if (!props.disabled) {
		emit('click', e);
	}
};
</script>
