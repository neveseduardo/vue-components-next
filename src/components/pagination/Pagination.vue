<template>
	<div class="g-pagination">
		<div class="g-pagination__per-page-wrapper">
			<div class="g-pagination__per-page">
				<ElSelect
					:model-value="source.per_page"
					@change="onChangePerPage"
				>
					<ElOption
						v-for="(item, index) in perPageOptions"
						:key="index"
						:label="item"
						:value="item"
					/>
				</ElSelect>
			</div>
			<div class="g-pagination__data-info">
				<span>Itens por página</span>
				<span>|</span>
				<span id="source-total">
					{{ source.total }} Registro(s)
				</span>
			</div>
		</div>

		<nav class="g-pagination__navigation">
			<ul class="g-pagination__list">
				<li
					v-tooltip.bottom="activeFirstPageButton && 'Ir para a primeira página'"
					class="g-pagination__list-item g-pagination__prev"
					:class="{ 'is-disabled': !activeFirstPageButton }"
				>
					<a @click.prevent="activeFirstPageButton && navigate(1)">
						<GIcon
							provide="mi"
							type="outlined"
							name="first_page"
						/>
					</a>
				</li>
				<li
					v-tooltip.bottom="activePrevButton && 'Ir para a página anterior'"
					class="g-pagination__list-item g-pagination__prev"
	:class="{ 'is-disabled': !activePrevButton }"
				>
					<a @click.prevent="activePrevButton && navigate(currentPage - 1)">
						<GIcon
							provide="mi"
							type="outlined"
							name="chevron_left"
						/>
					</a>
				</li>

				<li
					v-for="(page, index) in pages"
					:key="index"
					class="g-pagination__list-item g-pagination__page"
	:class="{ 'is-active': page === currentPage }"
				>
					<a @click.prevent="navigate(page)">{{ page }}</a>
				</li>

				<li
					v-tooltip.bottom="activeNextButton && 'Ir para a próxima página'"
					class="g-pagination__list-item g-pagination__next"
	:class="{ 'is-disabled': !activeNextButton }"
				>
					<a @click.prevent="activeNextButton && navigate(currentPage + 1)">
						<GIcon
							provide="mi"
							type="outlined"
							name="chevron_right"
						/>
					</a>
				</li>
				<li
					v-tooltip.bottom="activeLastPageButton && 'Ir para a última página'"
	:class="{ 'is-disabled': !activeLastPageButton }"
					class="g-pagination__list-item g-pagination__next"
				>
					<a @click.prevent="activeLastPageButton && navigate(totalPages)">
						<GIcon
							provide="mi"
							type="outlined"
							name="last_page"
						/>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import GIcon from '../icon/Icon.vue';

interface PaginationSource {
	total: number
	per_page: number
	current_page?: number
	page?: number
	pagina?: number
}

interface NavigateParams {
	per_page: number
	current_page: number
	page: number
}

interface Props {
	source: PaginationSource
	per_page_options?: number[]
	pages_quantity?: number
}

const props = withDefaults(defineProps<Props>(), {
	per_page_options: () => [20, 30, 50, 100, 300],
	pages_quantity: 6,
});

const emit = defineEmits<{
	(e: 'navigate', params: NavigateParams): void
}>();

const currentPage = computed(() => {
	const { page, current_page, pagina } = props.source;
	return isEmpty(page) ? (current_page || 1) : (page || 1);
});

const totalPages = computed(() => {
	const { total, per_page } = props.source;
	const totalPagesVal = Number(Math.ceil(total / per_page));
	return Number.isNaN(totalPagesVal) ? 0 : totalPagesVal;
});

const activeNextButton = computed(() => {
	return currentPage.value !== totalPages.value && totalPages.value > 1;
});

const activePrevButton = computed(() => {
	return currentPage.value > 1 && totalPages.value > 1;
});

const activeFirstPageButton = computed(() => {
	return currentPage.value > 3;
});

const activeLastPageButton = computed(() => {
	return currentPage.value < totalPages.value - 3;
});

const perPageOptions = computed(() => props.per_page_options);

const pages = computed(() => {
	const { pages_quantity } = props;
	const halfPagerCount = pages_quantity / 2;

	let showPrevMore = false;
	let showNextMore = false;

	if (totalPages.value > pages_quantity) {
		if (currentPage.value > pages_quantity - halfPagerCount)
			showPrevMore = true;
		if (currentPage.value < totalPages.value - halfPagerCount)
			showNextMore = true;
	}

	let array: number[] = [];

	if (showPrevMore && !showNextMore) {
		const startPage = totalPages.value - (pages_quantity - 2);
		array = range(startPage, totalPages.value);
	} else if (!showPrevMore && showNextMore) {
		array = range(1, pages_quantity - 1);
	} else if (showPrevMore && showNextMore) {
		const offset = Math.floor(pages_quantity / 2) - 1;
		const [start, end] = [
			currentPage.value - offset,
			currentPage.value + offset,
		];
		array = range(start, end);
	} else {
		array = range(1, totalPages.value);
	}

	return array;
});

const range = (start: number, end: number): number[] => {
	return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

const navigate = (page: number) => {
	if (page === currentPage.value) return;

	emit('navigate', {
		per_page: props.source.per_page,
		current_page: page,
		page,
	} as NavigateParams);
};

const onChangePerPage = (perPage: number) => {
	emit('navigate', {
		per_page: perPage,
		current_page: 1,
		page: 1,
	} as NavigateParams);
};

const isEmpty = (value: any): boolean => {
	return value === null || value === undefined || value === '';
};
</script>
