<template>
	<ElDropdown trigger="click">
		<Button>Toggle</Button>

		<template #dropdown>
			<ElDropdownMenu>
				<ElDropdownItem @click="handleThemeChange('dark')">
					Dark
				</ElDropdownItem>
				<ElDropdownItem @click="handleThemeChange('light')">
					Light
				</ElDropdownItem>
				<ElDropdownItem @click="handleThemeChange('system')">
					System
				</ElDropdownItem>
			</ElDropdownMenu>
		</template>
	</ElDropdown>
</template>

<script setup lang="ts">
import { ElDropdownItem, ElDropdown, ElDropdownMenu } from 'element-plus';
import { useTheme } from '../../composables/useTheme';
import Button from '../button/Button.vue';

const { theme, setTheme } = useTheme();

const handleThemeChange = (command: 'light' | 'dark' | 'system') => {
	setTheme(command);
};
</script>
