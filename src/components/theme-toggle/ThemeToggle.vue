<template>
	<Dropdown
		trigger="click"
		@command="handleThemeChange"
	>
		<template #trigger>
			<button
				class="theme-toggle__button"
				:title="currentThemeLabel"
			>
				<span class="theme-toggle__icon">{{ currentIcon }}</span>
			</button>
		</template>
		<ElDropdownItem command="light">
			<span class="theme-option">
				<span class="theme-option__icon">☀️</span>
				<span class="theme-option__label">Claro</span>
			</span>
		</ElDropdownItem>
		<ElDropdownItem command="dark">
			<span class="theme-option">
				<span class="theme-option__icon">🌙</span>
				<span class="theme-option__label">Escuro</span>
			</span>
		</ElDropdownItem>
		<ElDropdownItem command="system">
			<span class="theme-option">
				<span class="theme-option__icon">💻</span>
				<span class="theme-option__label">Sistema</span>
			</span>
		</ElDropdownItem>
	</Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElDropdownItem } from 'element-plus';
import { Dropdown } from '../dropdown';
import { useTheme } from '../../composables/useTheme';

const { theme, setTheme } = useTheme();

const currentIcon = computed(() => {
	switch (theme.value) {
		case 'light': return '☀️';
		case 'dark': return '🌙';
		case 'system': return '💻';
		default: return '💻';
	}
});

const currentThemeLabel = computed(() => {
	switch (theme.value) {
		case 'light': return 'Tema Claro';
		case 'dark': return 'Tema Escuro';
		case 'system': return 'Tema do Sistema';
		default: return 'Tema do Sistema';
	}
});

const handleThemeChange = (command: 'light' | 'dark' | 'system') => {
	setTheme(command);
};
</script>
