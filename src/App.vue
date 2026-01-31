<template>
	<div class="space-y-10 p-6">
		<h1 class="text-2xl font-semibold">
			Buttons
		</h1>

		<!-- SOLID -->
		<section class="space-y-4">
			<h2 class="text-lg font-medium">
				Solid
			</h2>

			<div class="flex flex-wrap gap-4">
				<GButton
					v-for="variant in variants"
					:key="`solid-${variant}`"
					:variant="variant"
					appearance="solid"
				>
					{{ variant }}
				</GButton>
			</div>
		</section>

		<!-- OUTLINED -->
		<section class="space-y-4">
			<h2 class="text-lg font-medium">
				Outlined
			</h2>

			<div class="flex flex-wrap gap-4">
				<GButton
					v-for="variant in variants"
					:key="`outlined-${variant}`"
					:variant="variant"
					appearance="outlined"
				>
					{{ variant }}
				</GButton>
			</div>
		</section>

		<!-- SIZES -->
		<section class="space-y-4">
			<h2 class="text-lg font-medium">
				Sizes
			</h2>

			<div class="space-y-3">
				<div class="flex items-center gap-4">
					<GButton
						v-for="variant in baseVariants"
						:key="`sm-${variant}`"
						:variant="variant"
						size="sm"
					>
						sm
					</GButton>
				</div>

				<div class="flex items-center gap-4">
					<GButton
						v-for="variant in baseVariants"
						:key="`md-${variant}`"
						:variant="variant"
						size="md"
					>
						md
					</GButton>
				</div>

				<div class="flex items-center gap-4">
					<GButton
						v-for="variant in baseVariants"
						:key="`lg-${variant}`"
						:variant="variant"
						size="lg"
					>
						lg
					</GButton>
				</div>
			</div>
		</section>

		<!-- STATES -->
		<section class="space-y-4">
			<h2 class="text-lg font-medium">
				States
			</h2>

			<div class="flex flex-wrap gap-4">
				<GButton
					variant="primary"
					disabled
				>
					Disabled
				</GButton>

				<GButton
					variant="primary"
					loading
				>
					Loading
				</GButton>

				<GButton
					variant="primary"
					appearance="outlined"
					disabled
				>
					Outlined disabled
				</GButton>
			</div>
		</section>

		<!-- ICON ONLY -->
		<section class="space-y-4">
			<h2 class="text-lg font-medium">
				Icon only
			</h2>

			<div class="flex flex-wrap gap-4">
				<GButton
					v-for="variant in baseVariants"
					:key="`icon-${variant}`"
					:variant="variant"
					icon-only
				>
					<GIcon icon="ic:baseline-add" />
				</GButton>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
type Variant =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'default'
	| 'neutral'
	| 'brand'
	| 'link'
	| 'link-neutral';

const variants: Variant[] = [
	'primary',
	'secondary',
	'success',
	'danger',
	'warning',
	'info',
	'default',
	'neutral',
	'brand',
	'link',
	'link-neutral',
];

const baseVariants: Variant[] = [
	'primary',
	'secondary',
	'success',
	'danger',
	'brand',
];
</script>
