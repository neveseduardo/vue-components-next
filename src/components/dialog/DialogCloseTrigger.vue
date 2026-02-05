<template>
	<GButton
		class="g-dialog__close-trigger"
		type="button"
		icon-only
		variant="default"
		:disabled="disabled"
		@click="onClick"
	>
		<GIcon
			icon="ic:baseline-close"
			class="g-dialog__close-icon"
		/>
	</GButton>
</template>

<script setup lang="ts">
import GIcon from '../icon/Icon.vue';
import GButton from '../button/Button.vue';
import { inject } from 'vue';

interface Props {
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const dialog = inject('dialog', { close: () => { } });

function closeDialog() {
	dialog.close();
}

const onClick = (e: MouseEvent) => {
	if (!props.disabled) {
		closeDialog();
		emit('click', e);
	}
};
</script>
