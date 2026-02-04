<template>
	<ElDrawer
		v-model="mutableVisible"
		class="g-drawer"
		:class="classes"
		:size="size"
		:with-header="false"
		:wrapper-closable="!disabled"
		:close-on-press-escape="!disabled"
		:destroy-on-close="destroyOnClose"
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
		<slot>
			<slot name="header">
				<DrawerHeader
					v-if="title || subtitle"
					:title="title"
					:subtitle="subtitle"
				>
					<slot name="close-trigger">
						<DrawerCloseTrigger
							v-if="showClose"
							:disabled="disabled"
							@click="onClose"
						/>
					</slot>
				</DrawerHeader>
			</slot>
			<div class="g-drawer__wrapper">
				<slot name="body">
					<DrawerBody :compact="compactBody">
						<slot />
					</DrawerBody>
				</slot>
				<slot name="footer">
					<DrawerFooter
						v-if="hasFooterSlot"
						:center="centerFooter"
						:compact="compactFooter"
						:space-between="footerSpaceBetween"
					>
						<slot name="footer" />
					</DrawerFooter>
				</slot>
			</div>
		</slot>
	</ElDrawer>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';
import { ElDrawer, ElLoading } from 'element-plus';
import DrawerHeader from './DrawerHeader.vue';
import DrawerBody from './DrawerBody.vue';
import DrawerFooter from './DrawerFooter.vue';
import DrawerCloseTrigger from './DrawerCloseTrigger.vue';

interface Props {
	title?: string;
	subtitle?: string;
	size?: string;
	modelValue?: boolean;
	disabled?: boolean;
	loading?: boolean;
	showClose?: boolean;
	destroyOnClose?: boolean;
	compactBody?: boolean;
	compactFooter?: boolean;
	centerFooter?: boolean;
	footerSpaceBetween?: boolean;
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
	showClose: true,
	destroyOnClose: false,
	compactBody: false,
	compactFooter: false,
	centerFooter: false,
	footerSpaceBetween: false,
});

const emit = defineEmits<Emits>();
const attrs = useAttrs();
const slots = useSlots();

const mutableVisible = computed({
	get: () => props.modelValue,
	set: (value: boolean) => emit('update:modelValue', value),
});

const classes = computed(() => ({
	'is-disabled': props.disabled,
}));

const hasFooterSlot = computed(() => !!slots.footer);

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
