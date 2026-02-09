<template>
	<GButton
		class="g-drawer__close-trigger"
		type="button"
		icon-only
		variant="default"
		:disabled="disabled"
		@click="onClick"
	>
		<GIcon
			icon="ic:baseline-close"
			class="g-drawer__close-icon"
		/>
	</GButton>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import GIcon from '../icon/Icon.vue';
import GButton from '../button/Button.vue';

interface Props {
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
}>();

const drawer = inject('drawer', { close: () => { } });

function closeDrawer() {
	drawer.close();
}

const onClick = (e: MouseEvent) => {
	if (!props.disabled) {
		closeDrawer();
		emit('click', e);
	}
};
</script>
