<template>
	<el-dropdown
		:trigger="trigger"
		:placement="placement"
		:disabled="disabled"
		@command="handleCommand"
		class="g-dropdown"
		:class="classes"
	>
		<slot name="trigger" />
		<template #dropdown>
			<el-dropdown-menu>
				<slot />
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElDropdown, ElDropdownMenu } from 'element-plus';

interface Props {
	variant?: 'default' | 'click' | 'hover';
	position?: 'bottom' | 'top' | 'left' | 'right';
	disabled?: boolean;
	trigger?: 'click' | 'hover' | 'focus';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	position: 'bottom',
	disabled: false,
	trigger: 'click',
});

const emit = defineEmits<{
	(e: 'command', command: any): void;
}>();

const placement = computed(() => {
	const positionMap: Record<string, string> = {
		'bottom': 'bottom',
		'top': 'top',
		'left': 'left',
		'right': 'right'
	};
	return positionMap[props.position] || 'bottom';
});

const classes = computed(() => ({
	[`g-dropdown--${props.variant}`]: props.variant,
	[`g-dropdown--${props.position}`]: props.position,
	[`g-dropdown--${props.trigger}`]: props.trigger,
	'is-disabled': props.disabled,
}));

const handleCommand = (command: any) => {
	emit('command', command);
};
</script>
