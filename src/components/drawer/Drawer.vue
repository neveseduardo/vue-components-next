<template>
	<ElDrawer
		v-model="mutableVisible"
		class="g-drawer"
		:size="size"
		:with-header="false"
		:wrapper-closable="!disabled"
		:close-on-press-escape="!disabled"
		v-bind="{ ...attrs, class: undefined }"
		@close="onClose"
		@open="$emit('open', $event)"
		@opened="$emit('opened', $event)"
		@closed="$emit('closed', $event)"
	>
		<ElLoading
			v-if="loading"
			:fullscreen="false"
			:lock="true"
		/>
		<slot name="drawer-header">
			<div class="g-drawer__header">
				<div class="g-drawer__title">
					<h3>{{ title }}</h3>
					<span>{{ subtitle }}</span>
				</div>

				<button
					class="g-drawer__close-button"
					:disabled="disabled"
					@click="onClose"
				>
					<GIcon icon="mdi:close" />
				</button>
			</div>
		</slot>

		<div class="g-drawer__wrapper">
			<main class="g-drawer__content">
				<slot />
			</main>

			<footer class="g-drawer__footer">
				<slot name="drawer-footer" />
			</footer>
		</div>
	</ElDrawer>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { ElDrawer, ElLoading } from 'element-plus';
import GIcon from '../icon/Icon.vue';

interface Props {
	title?: string;
	subtitle?: string;
	size?: string;
	modelValue?: boolean;
	disabled?: boolean;
	loading?: boolean;
}

interface Emits {
	(e: 'update:modelValue', value: boolean): void;
	(e: 'open', event: Event | undefined): void;
	(e: 'opened', event: Event | undefined): void;
	(e: 'closed', event: Event | undefined): void;
}

const props = withDefaults(defineProps<Props>(), {
	title: '',
	subtitle: '',
	size: '480px',
	modelValue: false,
	disabled: false,
	loading: false,
});

const emit = defineEmits<Emits>();
const attrs = useAttrs();

const mutableVisible = computed({
	get: () => props.modelValue,
	set: (value: boolean) => emit('update:modelValue', value),
});

const onClose = () => {
	emit('update:modelValue', false);
};

const open = () => {
	emit('update:modelValue', true);
};

const close = () => {
	emit('update:modelValue', false);
};

defineExpose({
	open,
	close,
});
</script>
