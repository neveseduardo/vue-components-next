<template>
	<div
		v-show="isActive"
		class="g-tab-item"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { inject, nextTick, onBeforeUnmount, onMounted, ref, computed } from 'vue';

interface TabsContext {
	activeTab(): number;
	tabs(): any[];
	registerTab(tab: any): void;
	unregisterTab(tabId: string): void;
}

interface Props {
	name: string;
	title: string;
	description?: string;
	disabled?: boolean;
	hasError?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	description: '',
	disabled: false,
	hasError: false,
});

const tabs = inject<TabsContext>('tabs');
const index = ref(-1);

const isActive = computed(() => tabs?.activeTab() === index.value);

const registerTab = () => {
	if (tabs) {
		tabs.registerTab({
			id: props.name,
			title: props.title,
			description: props.description,
			disabled: props.disabled,
			error: props.hasError,
		});

		nextTick(() => {
			index.value = tabs.tabs().findIndex(tab => tab.id === props.name);
		});
	}
};

onMounted(() => {
	registerTab();
});

onBeforeUnmount(() => {
	if (tabs) {
		tabs.unregisterTab(props.name);
	}
});
</script>
