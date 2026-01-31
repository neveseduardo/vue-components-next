import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'secondary', 'link', 'link-neutral', 'brand'],
			description: 'Variante visual do botão',
		},
		appearance: {
			control: 'select',
			options: ['solid', 'outlined'],
			description: 'Aparência do botão',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Tamanho do botão',
		},
		rounded: {
			control: 'boolean',
			description: 'Deixa o botão com bordas arredondadas',
		},
		loading: {
			control: 'boolean',
			description: 'Exibe estado de carregamento',
		},
		disabled: {
			control: 'boolean',
			description: 'Desabilita o botão',
		},
		iconOnly: {
			control: 'boolean',
			description: 'Exibe apenas o ícone sem texto',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'primary',
		appearance: 'solid',
		size: 'md',
		rounded: false,
		loading: false,
		disabled: false,
		iconOnly: false,
	},
	render: (args) => ({
		components: { Button },
		setup() {
			return { args };
		},
		template: '<Button v-bind="args">Clique aqui</Button>',
	}),
};

export const Variants: Story = {
	args: {
		appearance: 'solid',
		size: 'md',
		rounded: false,
		loading: false,
		disabled: false,
		iconOnly: false,
	},
	render: (args) => ({
		components: { Button },
		setup() {
			return { args };
		},
		template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <Button v-bind="args" variant="default">Default</Button>
        <Button v-bind="args" variant="primary">Primary</Button>
        <Button v-bind="args" variant="success">Success</Button>
        <Button v-bind="args" variant="warning">Warning</Button>
        <Button v-bind="args" variant="danger">Danger</Button>
        <Button v-bind="args" variant="info">Info</Button>
        <Button v-bind="args" variant="secondary">Secondary</Button>
        <Button v-bind="args" variant="link">Link</Button>
        <Button v-bind="args" variant="link-neutral">Link Neutral</Button>
        <Button v-bind="args" variant="brand">Brand</Button>
      </div>
    `,
	}),
};

export const Appearances: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		rounded: false,
		loading: false,
		disabled: false,
		iconOnly: false,
	},
	render: (args) => ({
		components: { Button },
		setup() {
			return { args };
		},
		template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <Button v-bind="args" appearance="solid">Solid</Button>
        <Button v-bind="args" appearance="outlined">Outlined</Button>
      </div>
    `,
	}),
};

export const Sizes: Story = {
	args: {
		variant: 'primary',
		appearance: 'solid',
		rounded: false,
		loading: false,
		disabled: false,
		iconOnly: false,
	},
	render: (args) => ({
		components: { Button },
		setup() {
			return { args };
		},
		template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <Button v-bind="args" size="sm">Pequeno</Button>
        <Button v-bind="args" size="md">Médio</Button>
        <Button v-bind="args" size="lg">Grande</Button>
      </div>
    `,
	}),
};

export const States: Story = {
	args: {
		variant: 'primary',
		appearance: 'solid',
		size: 'md',
		rounded: false,
		iconOnly: false,
	},
	render: (args) => ({
		components: { Button },
		setup() {
			return { args };
		},
		template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <Button v-bind="args">Normal</Button>
        <Button v-bind="args" disabled>Desabilitado</Button>
        <Button v-bind="args" loading>Carregando</Button>
        <Button v-bind="args" rounded>Arredondado</Button>
      </div>
    `,
	}),
};

export const WithIcons: Story = {
	args: {
		variant: 'primary',
		appearance: 'solid',
		size: 'md',
		rounded: false,
		loading: false,
		disabled: false,
	},
	render: (args) => ({
		components: { Button },
		setup() {
			return { args };
		},
		template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <Button v-bind="args">
          <template #left>
            <span style="width: 16px; height: 16px; background: currentColor; border-radius: 2px;"></span>
          </template>
          Ícone à esquerda
        </Button>
        <Button v-bind="args">
          Ícone à direita
          <template #right>
            <span style="width: 16px; height: 16px; background: currentColor; border-radius: 2px;"></span>
          </template>
        </Button>
        <Button v-bind="args" iconOnly>
          <span style="width: 16px; height: 16px; background: currentColor; border-radius: 2px;"></span>
        </Button>
      </div>
    `,
	}),
};
