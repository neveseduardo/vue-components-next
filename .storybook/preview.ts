import type { Preview } from '@storybook/vue3';
import '../src/assets/css/app.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			page: null,
		},
	},
};

export default preview;
