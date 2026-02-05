<template>
	<ElDialog
		v-model="mutableVisible"
		class="g-dialog"
		:class="classes"
		:width="width"
		:modal="modal"
		:close-on-click-modal="!disabled"
		:close-on-press-escape="!disabled"
		:show-close="false"
		:destroy-on-close="destroyOnClose"
		:before-close="beforeClose"
		v-bind="{ ...attrs, class: undefined }"
		@open="$emit('open', $event)"
		@opened="$emit('opened', $event)"
		@close="$emit('close', $event)"
		@closed="$emit('closed', $event)"
	>
		<ElLoading
			v-if="loading"
			:fullscreen="false"
			:lock="true"
		/>
		<slot>
			<slot name="header">
				<DialogHeader
					v-if="title || subtitle"
					:title="title"
					:subtitle="subtitle"
				>
					<slot name="close-trigger">
						<DialogCloseTrigger
							v-if="showClose"
							:disabled="disabled"
							@click="onClose"
						/>
					</slot>
				</DialogHeader>
			</slot>
			<slot name="body">
				<DialogBody :compact="compactBody">
					<slot />
				</DialogBody>
			</slot>
			<slot name="footer">
				<DialogFooter
					v-if="hasFooterSlot"
					:center="centerFooter"
					:compact="compactFooter"
					:space-between="footerSpaceBetween"
				>
					<slot name="footer" />
				</DialogFooter>
			</slot>
		</slot>
	</ElDialog>
</template>

<script setup lang="ts">
import { computed, provide, useAttrs, useSlots } from 'vue';
import { ElDialog, ElLoading } from 'element-plus';
import DialogHeader from './DialogHeader.vue';
import DialogBody from './DialogBody.vue';
import DialogFooter from './DialogFooter.vue';
import DialogCloseTrigger from './DialogCloseTrigger.vue';

interface Props {
	title?: string;
	subtitle?: string;
	modelValue?: boolean;
	disabled?: boolean;
	loading?: boolean;
	width?: string;
	modal?: boolean;
	showClose?: boolean;
	destroyOnClose?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	compactBody?: boolean;
	compactFooter?: boolean;
	centerFooter?: boolean;
	footerSpaceBetween?: boolean;
}

interface Emits {
	(e: 'update:modelValue', value: boolean): void;
	(e: 'open', event: Event | undefined): void;
	(e: 'opened', event: Event | undefined): void;
	(e: 'close', event: Event | undefined): void;
	(e: 'closed', event: Event | undefined): void;
}

const props = withDefaults(defineProps<Props>(), {
	title: '',
	subtitle: '',
	modelValue: false,
	disabled: false,
	loading: false,
	width: '520px',
	modal: true,
	showClose: true,
	destroyOnClose: false,
	size: 'md',
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
	[`g-dialog--${props.size}`]: props.size,
	'is-disabled': props.disabled,
}));

const hasFooterSlot = computed(() => !!slots.footer);

const onClose = () => {
	emit('update:modelValue', false);
	emit('close', undefined);
};

const beforeClose = (done: () => void) => {
	if (!props.disabled) {
		done();
	}
};

const open = () => {
	emit('update:modelValue', true);
};

const close = () => {
	emit('update:modelValue', false);
};

provide('dialog', {
	close,
});

defineExpose({
	open,
	close,
});
</script>
