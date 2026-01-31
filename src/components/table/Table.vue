<template>
	<div class="g-table">
		<ElTable
			ref="refDataTable"
			:key="renderKey"
			:fit="Boolean(attrs?.fit || false)"
			:highlight-current-row="highlightCurrentRow"
			:data="tableData"
			v-bind="attrs"
			@selection-change="$emit('selection-change', $event)"
			@row-click="$emit('row-click', $event)"
		>
			<ElTableColumn
				v-for="(structure, index) in tableStructure"
				:key="(structure?.prop || '') + index"
				ref="refTableColumns"
				v-bind="structure"
			>
				<template
					v-if="structure.slotHeader"
					#header
				>
					<slot :name="structure.slotHeader" />
				</template>

				<template
					v-else-if="structure.sortName"
					#header
				>
					<div class="g-table__sort-container">
						{{ structure.label }}
						<GButton
							v-tooltip="showSortTooltip && handleSortTooltip(structure)"
							class="g-table__sort-button"
							:class="sortedColumn.name === structure.sortName && `active ${[sortedColumn.dir]}`"
							type="default"
							just_icon
							:icon="sortedColumn.name === structure.sortName ? 'mdi:arrow-upward' : 'mdi:unfold-more-horizontal'"
							@click="onSort(structure.sortName)"
						/>
					</div>
				</template>

				<template
					v-if="structure.slotBody"
					#default="{ row, $index }"
				>
					<slot
						v-if="structure.slotBody"
						:name="structure.slotBody"
						:row="{ ...row, rowIndex: $index }"
					/>
				</template>
			</ElTableColumn>

			<!-- SLOT APPEND -->
			<template
				v-if="paginationData || slots.append"
				#append
			>
				<slot name="append">
					<Pagination
						v-bind="paginationData"
						@navigate="$emit('navigate', $event)"
					/>
				</slot>
			</template>
			<!-- SLOT EMPTY -->
			<template
				v-if="slots.empty || loading"
				#empty
			>
				<slot name="empty">
					<ElSkeleton
						:rows="6"
						animated
					/>
				</slot>
			</template>
		</ElTable>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, nextTick, useAttrs, useSlots } from 'vue';
import { ElTable, ElTableColumn, ElSkeleton } from 'element-plus';
import GButton from '../button/Button.vue';
import Pagination from '../pagination/Pagination.vue';

interface TableColumn {
	prop?: string;
	label?: string;
	width?: string;
	minWidth?: string;
	sortName?: string;
	slotHeader?: string;
	slotBody?: string;
	[key: string]: any;
}

interface SortColumn {
	name: string | null;
	dir: 'asc' | 'desc' | null;
}

interface PaginationSource {
	total: number
	per_page: number
	current_page?: number
	page?: number
	pagina?: number
}

interface PaginationData {
	source: PaginationSource
	per_page_options?: number[]
	pages_quantity?: number
}

interface Props {
	tableStructure?: TableColumn[];
	tableData?: any[];
	paginationData?: PaginationData;
	highlightCurrentRow?: boolean;
	loading?: boolean;
	sorted?: SortColumn;
	showSortTooltip?: boolean;
}

interface Emits {
	(e: 'selection-change', selection: any[]): void;
	(e: 'row-click', row: any): void;
	(e: 'navigate', pageData: any): void;
	(e: 'sort', sortData: SortColumn): void;
}

const props = withDefaults(defineProps<Props>(), {
	tableStructure: () => [],
	tableData: () => [],
	paginationData: () => ({
		source: {
			total: 0,
			per_page: 0,
		},
	}),
	highlightCurrentRow: false,
	loading: false,
	sorted: () => ({ name: null, dir: null }),
	showSortTooltip: true,
});

const emit = defineEmits<Emits>();
const attrs = useAttrs();
const slots = useSlots();

const refDataTable = ref<InstanceType<typeof ElTable>>();
const refTableColumns = ref<InstanceType<typeof ElTableColumn>[]>([]);

const sortedColumn = reactive<SortColumn>({
	name: null,
	dir: null,
});

const renderKey = ref(0);

watch(() => props.sorted, (newValue) => {
	sortedColumn.name = newValue.name;
	sortedColumn.dir = newValue.dir;
});

watch(() => props.tableStructure, () => {
	renderKey.value++;
	handleDomColumnsWidth();
});

onMounted(() => {
	handleDomColumnsWidth();
	sortedColumn.name = props.sorted.name;
	sortedColumn.dir = props.sorted.dir;
});

const onSort = (name: string) => {
	if (sortedColumn.name !== name) {
		sortedColumn.name = name;
		sortedColumn.dir = null;
	}
	if (sortedColumn.dir !== 'desc') {
		sortedColumn.dir = sortedColumn.dir === 'asc' ? 'desc' : 'asc';
	} else {
		sortedColumn.dir = null;
		sortedColumn.name = null;
	}
	emit('sort', { ...sortedColumn });
};

const clearSelectedRow = () => {
	if (!props.highlightCurrentRow) return;
	refDataTable.value?.setCurrentRow(null);
};

const handleDomColumnsWidth = async () => {
	await nextTick();
	if (attrs.fit) return;

	const theadCols = refDataTable.value?.$el.querySelectorAll('.el-table__header-wrapper colgroup col') as NodeListOf<HTMLElement>;
	const tbodyCols = refDataTable.value?.$el.querySelectorAll('.el-table__body-wrapper colgroup col') as NodeListOf<HTMLElement>;

	refTableColumns.value?.forEach((col, index) => {
		if (theadCols[index] && tbodyCols[index]) {
			const columnWidth = (col as any).width ?? '';
			const columnMinWidth = (col as any).minWidth ?? '34px';

			theadCols[index].style.width = columnWidth;
			theadCols[index].style.minWidth = columnMinWidth;
			tbodyCols[index].style.width = columnWidth;
			tbodyCols[index].style.minWidth = columnMinWidth;
		}
	});
};

const handleSortTooltip = (column: TableColumn) => {
	if (props.loading) return;
	const dirLabel = sortedColumn.dir === 'asc' ? 'Crescente' : 'Decrescente';
	return {
		content: sortedColumn.name !== column.sortName ?
			`Ordenar ${column.label}` :
			`Ordenado por:  <span class="dir">${dirLabel}</span>`,
		show: sortedColumn.name === column.sortName,
		trigger: sortedColumn.name === column.sortName ? 'manual' : 'hover',
		placement: 'bottom' as const,
		offset: -1,
		classes: 'sort-tooltip',
	};
};

defineExpose({
	refDataTable,
	refTableColumns,
	sortedColumn,
	onSort,
	clearSelectedRow,
});
</script>
