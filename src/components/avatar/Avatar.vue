<template>
	<ul class="g-avatar">
		<li
			v-for="(item, index) in list"
			:key="index"
			class="g-avatar__item"
		>
			<div
				:id="moreThanRenderQuantity(index) && 'more-than-render-quantity'"
				v-tooltip.bottom="index < (render_quantity - 1) ? item.name : restOfList"
				class="g-avatar__image"
			>
				<span
					v-if="moreThanRenderQuantity(index)"
					class="more-than-render-quantity"
				>
					+{{ avatarsRestCount }}
				</span>

				<Icon
					v-if="isEmpty(item.image)"
					name="ic:baseline-person"
				/>

				<img
					v-else
					:src="item.image"
					:alt="item.name"
				>
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../icon/Icon.vue';

interface AvatarItem {
	name: string;
	image?: string;
}

interface Props {
	avatars?: AvatarItem[];
	render_quantity?: number;
}

const props = withDefaults(defineProps<Props>(), {
	avatars: () => [],
	render_quantity: 3,
});

const moreThanRenderQuantity = (index: number): string | undefined => {
	const listLength = props.avatars.length;
	return String(props.avatars.length > props.render_quantity && index === listLength - 1);
};

const avatarsRestCount = computed(() => {
	return (props.avatars.length - props.render_quantity) + 1;
});

const list = computed(() => {
	const list = [...props.avatars];
	return list.reverse().slice(0, props.render_quantity);
});

const restOfList = computed(() => {
	const list = [...props.avatars].reverse();
	let rest: string | any[] = [];

	if (props.avatars.length) {
		if (moreThanRenderQuantity(0))
			rest = list.slice((props.render_quantity - 1), props.avatars.length);
		else rest.push(list.slice(-1));
	}

	rest = rest.reduce((prev: string, curr: AvatarItem) => {
		return (prev += `<li>${curr.name}</li>` + ',');
	}, '');

	return rest;
});

const isEmpty = (value: any): boolean => {
	return value === null || value === undefined || value === '';
};
</script>
