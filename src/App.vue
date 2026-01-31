<template>
	<div class="space-y-12 p-6 max-w-6xl mx-auto">
		<!-- INPUTS DOCUMENTATION -->
		<div class="space-y-10">
			<h1 class="text-3xl font-bold text-gray-900">
				Input Components
			</h1>

			<!-- BASIC INPUTS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Basic Inputs
				</h2>
				<p class="text-gray-600">Different input types and basic functionality</p>

				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Text Input</label>
						<GInput v-model="values.text" placeholder="Enter text" />
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Email Input</label>
						<GInput v-model="values.email" type="email" placeholder="email@example.com" />
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Password Input</label>
						<GInput v-model="values.password" type="password" placeholder="Enter password" />
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Number Input</label>
						<GInput v-model="values.number" type="number" placeholder="0" />
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Search Input</label>
						<GInput v-model="values.search" type="search" placeholder="Search..." />
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Clearable Input</label>
						<GInput v-model="values.clearable" clearable placeholder="Type to clear" />
					</div>
				</div>
			</section>

			<!-- LABEL VARIANTS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Label Variants
				</h2>
				<p class="text-gray-600">Different label positioning and behavior</p>

				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div class="space-y-2">
						<GInput 
							v-model="labels.floating" 
							label="Floating Label" 
							label-variant="floating" 
							placeholder="Type here..."
						/>
					</div>

					<div class="space-y-2">
						<GInput 
							v-model="labels.static" 
							label="Static Label" 
							label-variant="static" 
						/>
					</div>

					<div class="space-y-2">
						<GInput 
							v-model="labels.placeholder" 
							label="Placeholder Style" 
							label-variant="placeholder" 
							placeholder="This is a placeholder"
						/>
					</div>
				</div>
			</section>

			<!-- COLOR VARIANTS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Color Variants
				</h2>
				<p class="text-gray-600">Default and neutral color variants</p>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="space-y-4">
						<div>
							<h3 class="text-sm font-medium text-gray-700 mb-3">Default Variant</h3>
							<GInput 
								v-model="colorVariants.defaultNormal" 
								label="Default Normal" 
								label-variant="floating" 
								placeholder="Primary colors"
								variant="default"
							/>
						</div>
						
						<GInput 
							v-model="colorVariants.defaultInvalid" 
							label="Default Invalid" 
							label-variant="floating" 
							placeholder="Shows red border and label"
							variant="default"
							:invalid="true"
						/>
					</div>

					<div class="space-y-4">
						<div>
							<h3 class="text-sm font-medium text-gray-700 mb-3">Neutral Variant</h3>
							<GInput 
								v-model="colorVariants.neutralNormal" 
								label="Neutral Normal" 
								label-variant="floating" 
								placeholder="Neutral colors"
								variant="neutral"
							/>
						</div>
						
						<GInput 
							v-model="colorVariants.neutralInvalid" 
							label="Neutral Invalid" 
							label-variant="floating" 
							placeholder="Shows red border and label"
							variant="neutral"
							:invalid="true"
						/>
					</div>
				</div>
			</section>

			<!-- SIZES -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Input Sizes
				</h2>
				<p class="text-gray-600">Small, medium, and large variants</p>

				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<div class="w-16 text-sm font-medium">Small:</div>
						<GInput 
							size="sm" 
							label="Small input" 
							label-variant="floating" 
							placeholder="Small size"
							class="max-w-xs"
						/>
					</div>

					<div class="flex items-center gap-4">
						<div class="w-16 text-sm font-medium">Medium:</div>
						<GInput 
							size="md" 
							label="Medium input" 
							label-variant="floating" 
							placeholder="Medium size"
							class="max-w-xs"
						/>
					</div>

					<div class="flex items-center gap-4">
						<div class="w-16 text-sm font-medium">Large:</div>
						<GInput 
							size="lg" 
							label="Large input" 
							label-variant="floating" 
							placeholder="Large size"
							class="max-w-xs"
						/>
					</div>
				</div>
			</section>

			<!-- STATES -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Input States
				</h2>
				<p class="text-gray-600">Disabled, loading, invalid, and read-only states</p>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="space-y-4">
						<GInput 
							v-model="states.normal" 
							label="Normal State" 
							label-variant="floating"
						/>
						
						<GInput 
							:disabled="true" 
							label="Disabled State" 
							label-variant="floating"
							value="This is disabled"
						/>

						<GInput 
							:readonly="true" 
							label="Read Only State" 
							label-variant="floating"
							value="This is read only"
						/>
					</div>

					<div class="space-y-4">
						<GInput 
							v-model="states.invalid" 
							label="Invalid State" 
							label-variant="floating"
							:invalid="true"
							placeholder="This field is invalid"
						/>

						<GInput 
							v-model="states.loading" 
							label="Loading State" 
							label-variant="floating"
							:loading="true"
							placeholder="Loading..."
						/>

						<GInput 
							v-model="states.required" 
							label="Required Field" 
							label-variant="floating"
							placeholder="This field is required"
							:required="true"
						/>
					</div>
				</div>
			</section>

			<!-- WITH ICONS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Inputs with Icons
				</h2>
				<p class="text-gray-600">Left and right icon slots</p>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="space-y-4">
						<GInput 
							v-model="icons.left" 
							label="Search with icon" 
							label-variant="floating"
							placeholder="Search..."
						>
							<template #left>
								<GIcon icon="ic:baseline-search" class="text-gray-400" />
							</template>
						</GInput>

						<GInput 
							v-model="icons.email" 
							label="Email with icon" 
							label-variant="floating"
							placeholder="email@example.com"
						>
							<template #left>
								<GIcon icon="ic:baseline-email" class="text-gray-400" />
							</template>
						</GInput>
					</div>

					<div class="space-y-4">
						<GInput 
							v-model="icons.currency" 
							label="Currency" 
							label-variant="floating"
							placeholder="0.00"
						>
							<template #left>
								<span class="text-gray-500">$</span>
							</template>
						</GInput>

						<GInput 
							v-model="icons.website" 
							label="Website" 
							label-variant="floating"
							placeholder="https://example.com"
						>
							<template #right>
								<GIcon icon="ic:baseline-language" class="text-gray-400" />
							</template>
						</GInput>
					</div>
				</div>
			</section>

			<!-- VALIDATION EXAMPLES -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Validation Examples
				</h2>
				<p class="text-gray-600">Common validation patterns</p>

				<div class="grid gap-6 md:grid-cols-2">
					<GInput 
						v-model="validation.email" 
						label="Email (invalid when not proper format)" 
						label-variant="floating"
						type="email"
						placeholder="email@example.com"
						:invalid="!isValidEmail(validation.email) && validation.email !== ''"
					/>

					<GInput 
						v-model="validation.minLength" 
						label="Min 8 characters" 
						label-variant="floating"
						placeholder="At least 8 chars"
						:invalid="validation.minLength.length < 8 && validation.minLength !== ''"
						:minlength="8"
					/>
				</div>
			</section>
		</div>

		<!-- BUTTONS SECTION -->
		<div class="space-y-10 border-t pt-10">
			<h1 class="text-3xl font-bold text-gray-900">
				Button Components
			</h1>

			<!-- SOLID -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
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
				<h2 class="text-xl font-semibold text-gray-800">
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
				<h2 class="text-xl font-semibold text-gray-800">
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
				<h2 class="text-xl font-semibold text-gray-800">
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
				<h2 class="text-xl font-semibold text-gray-800">
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
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

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

// Input values for examples
const values = reactive({
	text: '',
	email: '',
	password: '',
	number: '',
	search: '',
	clearable: '',
});

// Label variants
const labels = reactive({
	floating: '',
	static: '',
	placeholder: '',
});

// Input states
const states = reactive({
	normal: '',
	invalid: '',
	loading: '',
	required: '',
});

// Color variants
const colorVariants = reactive({
	defaultNormal: '',
	defaultInvalid: 'Invalid value',
	neutralNormal: '',
	neutralInvalid: 'Invalid value',
});

// Icons examples
const icons = reactive({
	left: '',
	email: '',
	currency: '',
	website: '',
});

// Validation examples
const validation = reactive({
	email: '',
	minLength: '',
});

// Helper functions
const isValidEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
</script>
