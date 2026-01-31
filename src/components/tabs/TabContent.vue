<template>
	<div class="g-tab-content-area">
		<slot
			:tab="currentTabData"
			:tab-index="activeTab"
		/>
	</div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';

interface TabsContext {
	activeTab(): number;
	tabs(): any[];
}

const tabs = inject<TabsContext>('tabs');

const activeTab = computed(() => tabs?.activeTab() ?? 0);
const tabsList = computed(() => tabs?.tabs() ?? []);

const currentTabData = computed(() => tabsList.value[activeTab.value]);
</script>
