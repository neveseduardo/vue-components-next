import { computed, watch, onMounted } from 'vue';
import { usePreferredDark, useStorage } from '@vueuse/core';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
	const preferredDark = usePreferredDark();
	const theme = useStorage<Theme>('theme', 'system', localStorage);

	const isDark = computed(() => {
		if (theme.value === 'system') {
			return preferredDark.value;
		}
		return theme.value === 'dark';
	});

	const setTheme = (newTheme: Theme) => {
		theme.value = newTheme;
	};

	const toggleTheme = () => {
		if (theme.value === 'light') {
			setTheme('dark');
		} else if (theme.value === 'dark') {
			setTheme('system');
		} else {
			setTheme('light');
		}
	};

	watch(isDark, (dark) => {
		const root = document.documentElement;
		if (dark) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, { immediate: true });

	onMounted(() => {
		if (isDark.value) {
			document.documentElement.classList.add('dark');
		}
	});

	return {
		theme: computed(() => theme.value),
		isDark,
		setTheme,
		toggleTheme,
	};
}
