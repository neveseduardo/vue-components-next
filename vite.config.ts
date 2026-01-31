import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
	const isLib = mode === 'lib';

	return {
		plugins: [
			vue(),
			tailwindcss(),
		].filter(Boolean),

		test: {
			environment: 'jsdom',
			globals: true,
		},

		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},

		build: isLib ?
			{
				lib: {
					entry: resolve(__dirname, 'src/components/index.ts'),
					name: 'OTComponents',
					fileName: (format) => `vue-components-next.${format}.js`,
					formats: ['es', 'umd'],
				},
				rollupOptions: {
					external: ['vue'],
					output: {
						globals: {
							vue: 'Vue',
						},
					},
				},
			} :
			undefined,
	};
});
