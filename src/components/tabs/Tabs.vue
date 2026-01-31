<template>
	<div
		class="g-tabs"
		:class="{ 'vertical': vertical }"
	>
		<div class="g-tabs-header">
			<slot
				name="tabsWrapper"
				:tabs="processedTabs"
				:active-tab="activeTab"
				:go-to-tab="goToTab"
				:disabled="disabled"
			>
				<div class="g-tabs-nav">
					<div
						v-for="(tab, index) in processedTabs"
						:key="tab.id"
						class="g-tab-nav-item"
						:class="getTabClass(tab, index)"
						@click="!disabled && isTabClickable(tab, index) && goToTab(index)"
					>
						<span class="g-tab-title">{{ tab.title }}</span>
						<span
							v-if="tab.description"
							class="g-tab-description"
						>
							{{ tab.description }}
						</span>
						<span
							v-if="tab.error"
							class="g-tab-error"
						>!</span>
					</div>
				</div>
			</slot>
		</div>

		<div class="g-tabs-content">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, reactive } from 'vue';

interface Tab {
	id: string;
	title: string;
	description?: string;
	disabled?: boolean;
	error?: boolean;
	internalId?: number;
	[key: string]: any;
}

interface ProcessedTab extends Tab {
	disabled: boolean;
	error?: boolean;
	active: boolean;
	index: number;
}

interface Props {
	initialTab?: number;
	vertical?: boolean;
	disabled?: boolean;
}

interface Emits {
	(e: 'tab-change', tabIndex: number): void;
	(e: 'update-tab', tabId: string, updates: Partial<Tab>): void;
}

const props = withDefaults(defineProps<Props>(), {
	initialTab: 0,
	vertical: false,
	disabled: false,
});

const emit = defineEmits<Emits>();

const activeTab = ref(props.initialTab);
const tabs = ref<Tab[]>([]);
const tabCounter = ref(0);

const processedTabs = computed<ProcessedTab[]>(() =>
	tabs.value.map((tab, index) => ({
		...tab,
		disabled: tab.disabled || false,
		error: tab.error,
		active: index === activeTab.value,
		index: index,
	}))
);

watch(() => props.initialTab, (newVal) => {
	activeTab.value = newVal;
});

const registerTab = (tab: Tab) => {
	const tabIndex = tabs.value.findIndex(t => t.id === tab.id);
	if (tabIndex === -1) {
		tabs.value.push({
			...tab,
			internalId: tabCounter.value++,
		});
	}
};

const unregisterTab = (tabId: string) => {
	const tabIndex = tabs.value.findIndex(t => t.id === tabId);
	if (tabIndex > -1) {
		tabs.value.splice(tabIndex, 1);
		if (activeTab.value >= tabs.value.length && activeTab.value > 0) {
			activeTab.value = tabs.value.length - 1;
		}
	}
};

const updateTab = (tabId: string, updates: Partial<Tab>) => {
	const tabIndex = tabs.value.findIndex(t => t.id === tabId);
	if (tabIndex > -1) {
		tabs.value[tabIndex] = { ...tabs.value[tabIndex], ...updates };
	}
};

const goToTab = (index: number) => {
	if (index >= 0 && index < tabs.value.length && index !== activeTab.value) {
		activeTab.value = index;
		emit('tab-change', index);
	}
};

const nextTab = () => {
	if (activeTab.value < tabs.value.length - 1) {
		goToTab(activeTab.value + 1);
	}
};

const previousTab = () => {
	if (activeTab.value > 0) {
		goToTab(activeTab.value - 1);
	}
};

const setTabError = (tabId: string, hasError: boolean) => {
	const tabIndex = tabs.value.findIndex(t => t.id === tabId);
	if (tabIndex > -1) {
		tabs.value[tabIndex].error = hasError;
	}
};

const getTabClass = (tab: ProcessedTab, index: number) => {
	return {
		'active': tab.active,
		'disabled': tab.disabled,
		'error': tab.error,
		'clickable': isTabClickable(tab, index),
	};
};

const isTabClickable = (tab: ProcessedTab, index: number) => {
	return !tab.disabled && index !== activeTab.value;
};

const tabsContext = reactive({
	activeTab: () => activeTab.value,
	tabs: () => tabs.value,
	processedTabs: () => processedTabs.value,
	goToTab,
	nextTab,
	previousTab,
	updateTab,
	registerTab,
	unregisterTab,
	setTabError,
});

provide('tabs', tabsContext);

defineExpose({
	registerTab,
	unregisterTab,
	updateTab,
	goToTab,
	nextTab,
	previousTab,
	setTabError,
	activeTab,
	tabs,
});
</script>
