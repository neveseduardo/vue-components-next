import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
	it('renderiza o botão corretamente', () => {
		const wrapper = mount(Button, {
			slots: {
				default: 'Clique aqui',
			},
		});

		expect(wrapper.element.tagName).toBe('BUTTON');
		expect(wrapper.text()).toContain('Clique aqui');
	});

	it('aplica classes de variant e size', () => {
		const wrapper = mount(Button, {
			props: {
				variant: 'primary',
				size: 'lg',
			},
		});

		expect(wrapper.classes()).toContain('g-button--primary');
		expect(wrapper.classes()).toContain('g-button--lg');
	});

	it('fica desabilitado quando disabled=true', () => {
		const wrapper = mount(Button, {
			props: {
				disabled: true,
			},
		});

		expect(wrapper.attributes('disabled')).toBeDefined();
		expect(wrapper.classes()).toContain('is-disabled');
	});

	it('mostra o slot de loading quando loading=true', () => {
		const wrapper = mount(Button, {
			props: {
				loading: true,
			},
		});

		expect(wrapper.classes()).toContain('is-loading');
		expect(wrapper.find('.g-button__spinner').exists()).toBe(true);
	});

	it('não emite click quando disabled', async () => {
		const onClick = vi.fn();

		const wrapper = mount(Button, {
			props: {
				disabled: true,
			},
			attrs: {
				onClick,
			},
		});

		await wrapper.trigger('click');

		expect(onClick).not.toHaveBeenCalled();
	});

	it('não emite click quando loading', async () => {
		const onClick = vi.fn();

		const wrapper = mount(Button, {
			props: {
				loading: true,
			},
			attrs: {
				onClick,
			},
		});

		await wrapper.trigger('click');

		expect(onClick).not.toHaveBeenCalled();
	});

	it('emite click quando ativo', async () => {
		const wrapper = mount(Button);

		await wrapper.trigger('click');

		expect(wrapper.emitted('click')).toHaveLength(1);
	});

	it('renderiza slot left e right', () => {
		const wrapper = mount(Button, {
			slots: {
				left: '<span class="icon-left" />',
				right: '<span class="icon-right" />',
				default: 'Texto',
			},
		});

		expect(wrapper.find('.g-button__left').exists()).toBe(true);
		expect(wrapper.find('.g-button__right').exists()).toBe(true);
	});

	it('repassa atributos HTML para o button', () => {
		const wrapper = mount(Button, {
			attrs: {
				type: 'submit',
				'aria-label': 'Salvar',
				'data-testid': 'btn',
			},
		});

		const button = wrapper.find('button');

		expect(button.attributes('type')).toBe('submit');
		expect(button.attributes('aria-label')).toBe('Salvar');
		expect(button.attributes('data-testid')).toBe('btn');
	});

});
