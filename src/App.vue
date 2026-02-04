<template>
	<div class="space-y-12 p-6 max-w-6xl mx-auto">
		<!-- INPUTS DOCUMENTATION -->
		<div class="space-y-10">
			<h1 class="text-3xl font-bold">
				Input Components
			</h1>

			<!-- BASIC INPUTS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold">
					Basic Inputs
				</h2>
				<p>
					Different input types and basic functionality
				</p>

				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div class="space-y-2">
						<label class="block text-sm font-medium">Text Input</label>
						<GInput
							v-model="values.text"
							placeholder="Enter text"
						/>
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium">Email Input</label>
						<GInput
							v-model="values.email"
							type="email"
							placeholder="email@example.com"
						/>
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium">Password Input</label>
						<GInput
							v-model="values.password"
							type="password"
							placeholder="Enter password"
						/>
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium">Number Input</label>
						<GInput
							v-model="values.number"
							type="number"
							placeholder="0"
						/>
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium">Search Input</label>
						<GInput
							v-model="values.search"
							type="search"
							placeholder="Search..."
						/>
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium">Clearable Input</label>
						<GInput
							v-model="values.clearable"
							clearable
							placeholder="Type to clear"
						/>
					</div>
				</div>
			</section>

			<!-- LABEL VARIANTS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold">
					Label Variants
				</h2>
				<p>
					Different label positioning and behavior
				</p>

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
				<h2 class="text-xl font-semibold">
					Color Variants
				</h2>
				<p>
					Default and neutral color variants
				</p>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="space-y-4">
						<div>
							<h3 class="text-sm font-medium mb-3">
								Default Variant
							</h3>
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
							<h3 class="text-sm font-medium mb-3">
								Neutral Variant
							</h3>
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
				<h2 class="text-xl font-semibold">
					Input Sizes
				</h2>
				<p>
					Small, medium, and large variants
				</p>

				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<div class="w-16 text-sm font-medium">
							Small:
						</div>
						<GInput
							size="sm"
							label="Small input"
							label-variant="floating"
							placeholder="Small size"
							class="max-w-xs"
						/>
					</div>

					<div class="flex items-center gap-4">
						<div class="w-16 text-sm font-medium">
							Medium:
						</div>
						<GInput
							size="md"
							label="Medium input"
							label-variant="floating"
							placeholder="Medium size"
							class="max-w-xs"
						/>
					</div>

					<div class="flex items-center gap-4">
						<div class="w-16 text-sm font-medium">
							Large:
						</div>
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
				<h2 class="text-xl font-semibold">
					Input States
				</h2>
				<p>
					Disabled, loading, invalid, and read-only states
				</p>

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
				<h2 class="text-xl font-semibold">
					Inputs with Icons
				</h2>
				<p>
					Left and right icon slots
				</p>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="space-y-4">
						<GInput
							v-model="icons.left"
							label="Search with icon"
							label-variant="floating"
							placeholder="Search..."
						>
							<template #left>
								<GIcon
									icon="ic:baseline-search"
								/>
							</template>
						</GInput>

						<GInput
							v-model="icons.email"
							label="Email with icon"
							label-variant="floating"
							placeholder="email@example.com"
						>
							<template #left>
								<GIcon
									icon="ic:baseline-email"
								/>
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
								<span>$</span>
							</template>
						</GInput>

						<GInput
							v-model="icons.website"
							label="Website"
							label-variant="floating"
							placeholder="https://example.com"
						>
							<template #right>
								<GIcon
									icon="ic:baseline-language"
								/>
							</template>
						</GInput>
					</div>
				</div>
			</section>

			<!-- VALIDATION EXAMPLES -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold">
					Validation Examples
				</h2>
				<p>
					Common validation patterns
				</p>

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
			<h1 class="text-3xl font-bold">
				Button Components
			</h1>

			<!-- SOLID -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold">
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
				<h2 class="text-xl font-semibold">
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
				<h2 class="text-xl font-semibold">
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
				<h2 class="text-xl font-semibold">
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

		<!-- SWITCH SECTION -->
		<div class="space-y-10 border-t pt-10">
			<h1 class="text-3xl font-bold text-gray-900">
				Switch Components
			</h1>

			<!-- BASIC SWITCHES -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Basic Switches
				</h2>
				<p class="text-gray-600">
					Different switch states and configurations
				</p>

				<div class="flex flex-wrap gap-6">
					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Normal Switch</label>
						<GSwitch
							v-model="switches.normal"
							@change="onSwitchChange('normal', $event)"
						/>
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Small Switch</label>
						<GSwitch
							v-model="switches.small"
							small
							@change="onSwitchChange('small', $event)"
						/>
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Disabled Switch</label>
						<GSwitch
							:model-value="false"
							disabled
						/>
					</div>

					<div class="space-y-2">
						<label class="block text-sm font-medium text-gray-700">Custom Text</label>
						<GSwitch
							v-model="switches.customText"
							:text="{ active: 'On', inactive: 'Off' }"
							@change="onSwitchChange('customText', $event)"
						/>
					</div>
				</div>
			</section>

			<!-- SWITCH GROUPS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Switch Groups
				</h2>
				<p class="text-gray-600">
					Multiple switches for settings
				</p>

				<div class="space-y-4">
					<div class="flex items-center justify-between p-4 border rounded-lg">
						<div>
							<h3 class="font-medium text-gray-900">
								Email Notifications
							</h3>
							<p class="text-sm text-gray-600">
								Receive email updates about your account
							</p>
						</div>
						<GSwitch
							v-model="settings.notifications.email"
							@change="onSettingChange('email', $event)"
						/>
					</div>

					<div class="flex items-center justify-between p-4 border rounded-lg">
						<div>
							<h3 class="font-medium text-gray-900">
								Push Notifications
							</h3>
							<p class="text-sm text-gray-600">
								Receive push notifications on your device
							</p>
						</div>
						<GSwitch
							v-model="settings.notifications.push"
							@change="onSettingChange('push', $event)"
						/>
					</div>

					<div class="flex items-center justify-between p-4 border rounded-lg">
						<div>
							<h3 class="font-medium text-gray-900">
								Dark Mode
							</h3>
							<p class="text-sm text-gray-600">
								Use dark theme across the application
							</p>
						</div>
						<GSwitch
							v-model="settings.darkMode"
							@change="onThemeToggle($event)"
						/>
					</div>

					<div class="flex items-center justify-between p-4 border rounded-lg">
						<div>
							<h3 class="font-medium text-gray-900">
								Analytics
							</h3>
							<p class="text-sm text-gray-600">
								Help us improve by sharing usage data
							</p>
						</div>
						<GSwitch
							v-model="settings.analytics"
							@change="onSettingChange('analytics', $event)"
						/>
					</div>
				</div>
			</section>
		</div>

		<!-- CARDS SECTION -->
		<div class="space-y-10 border-t pt-10">
			<h1 class="text-3xl font-bold text-gray-900">
				Card Components
			</h1>

			<!-- BASIC CARDS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Basic Cards
				</h2>
				<p class="text-gray-600">
					Different card variants and basic functionality
				</p>

				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader
							title="Default Card"
							subtitle="Basic card component"
						/>
						<CardBody text="This is a default card with header and body." />
						<CardFooter>
							<div class="g-card__actions">
								<GButton size="sm" appearance="outlined">Cancel</GButton>
								<GButton size="sm" variant="primary">Save</GButton>
							</div>
						</CardFooter>
					</Card>

					<Card variant="elevated">
						<CardHeader
							title="Elevated Card"
							subtitle="With enhanced shadow"
						/>
						<CardBody text="This card has elevated styling with stronger shadow." />
					</Card>

					<Card variant="outlined">
						<CardHeader
							title="Outlined Card"
							subtitle="Border emphasis"
						/>
						<CardBody text="This card uses outlined style with emphasized border." />
					</Card>

					<Card variant="flat">
						<CardHeader
							title="Flat Card"
							subtitle="Minimal styling"
						/>
						<CardBody text="This card has flat appearance with minimal shadow." />
					</Card>

					<Card clickable @click="onCardClick('clickable')">
						<CardHeader
							title="Clickable Card"
							subtitle="Click to interact"
						/>
						<CardBody text="This card responds to clicks and has hover effects." />
					</Card>

					<Card>
						<CardBody>
							<h3 class="g-card__title">Custom Content</h3>
							<p class="g-card__description">Cards can contain completely custom content without predefined structure.</p>
							<div class="mt-4 space-y-2">
								<div class="flex items-center gap-2">
									<div class="w-2 h-2 rounded-full bg-green-500"></div>
									<span class="text-sm">Status: Active</span>
								</div>
								<div class="flex items-center gap-2">
									<div class="w-2 h-2 rounded-full bg-blue-500"></div>
									<span class="text-sm">Priority: High</span>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
			</section>

			<!-- COMPACT CARDS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Compact Cards
				</h2>
				<p class="text-gray-600">
					Cards with reduced padding for space-efficient layouts
				</p>

				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader
							compact
							title="Compact Header"
							subtitle="Reduced padding"
						/>
						<CardBody compact text="Compact card body with less vertical spacing." />
						<CardFooter compact>
							<GButton size="sm" variant="primary">Action</GButton>
						</CardFooter>
					</Card>

					<Card>
						<CardBody compact>
							<div class="flex items-center justify-between">
								<div>
									<h4 class="g-card__title">Quick Stats</h4>
									<p class="g-card__subtitle">User metrics</p>
								</div>
								<div class="text-2xl font-bold text-primary-key">
									{{ cardStats.users }}
								</div>
							</div>
						</CardBody>
					</Card>

					<Card variant="outlined">
						<CardBody compact>
							<div class="space-y-2">
								<div class="flex justify-between items-center">
									<span class="text-sm font-medium">Progress</span>
									<span class="text-sm">{{ cardStats.progress }}%</span>
								</div>
								<div class="w-full bg-neutral-90 rounded-full h-2">
									<div 
										class="bg-primary-key h-2 rounded-full transition-all"
										:style="`width: ${cardStats.progress}%`"
									></div>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
			</section>

			<!-- INTERACTIVE CARDS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Interactive Cards
				</h2>
				<p class="text-gray-600">
					Cards with interactive elements and dynamic content
				</p>

				<div class="grid gap-6 md:grid-cols-2">
					<Card clickable @click="toggleFavorite">
						<CardHeader>
							<div class="flex items-start justify-between">
								<div>
									<h3 class="g-card__title">Favorite Toggle</h3>
									<p class="g-card__subtitle">Click to toggle favorite status</p>
								</div>
								<div 
									class="text-2xl transition-colors"
									:class="cardInteractive.isFavorite ? 'text-warning-key' : 'text-neutral-60'"
								>
									{{ cardInteractive.isFavorite ? '★' : '☆' }}
								</div>
							</div>
						</CardHeader>
						<CardBody>
							<p class="g-card__description">
								This card demonstrates interactive state management. Click anywhere on the card to toggle the favorite status.
							</p>
							<div class="mt-4 p-3 bg-neutral-95 rounded-md">
								<p class="text-sm">
									Status: <span class="font-medium">{{ cardInteractive.isFavorite ? 'Favorited' : 'Not favorited' }}</span>
								</p>
							</div>
						</CardBody>
					</Card>

					<Card>
						<CardHeader
							title="Form Card"
							subtitle="With interactive elements"
						/>
						<CardBody>
							<div class="space-y-4">
								<GInput
									v-model="cardInteractive.inputValue"
									label="Type something..."
									label-variant="floating"
									placeholder="Card content"
								/>
								<GSwitch
									v-model="cardInteractive.switchValue"
									:text="{ active: 'Enabled', inactive: 'Disabled' }"
								/>
							</div>
						</CardBody>
						<CardFooter>
							<div class="g-card__actions">
								<GButton size="sm" appearance="outlined">Clear</GButton>
								<GButton 
									size="sm" 
									variant="primary"
									@click="submitCardForm"
								>
									Submit
								</GButton>
							</div>
						</CardFooter>
					</Card>
				</div>
			</section>

			<!-- CARD LAYOUTS -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Card Layouts
				</h2>
				<p class="text-gray-600">
					Different layout patterns and compositions
				</p>

				<div class="space-y-6">
					<!-- Horizontal Card -->
					<Card class="max-w-2xl">
						<div class="flex">
							<div class="flex-shrink-0 bg-neutral-95 p-8 border-r border-neutral-90">
								<div class="w-16 h-16 bg-primary-key rounded-lg flex items-center justify-center text-white text-2xl font-bold">
									A
								</div>
							</div>
							<div class="flex-1">
								<CardHeader
									title="Horizontal Layout"
									subtitle="Side-by-side content"
								/>
								<CardBody text="This card demonstrates a horizontal layout with an icon section and content area." />
							</div>
						</div>
					</Card>

					<!-- Stats Grid -->
					<div class="grid gap-4 md:grid-cols-4">
						<Card variant="flat">
							<CardBody compact>
								<div class="text-center">
									<div class="text-2xl font-bold text-primary-key">{{ cardLayoutStats.total }}</div>
									<div class="text-sm text-neutral-60">Total Users</div>
								</div>
							</CardBody>
						</Card>

						<Card variant="flat">
							<CardBody compact>
								<div class="text-center">
									<div class="text-2xl font-bold text-success-key">{{ cardLayoutStats.active }}</div>
									<div class="text-sm text-neutral-60">Active</div>
								</div>
							</CardBody>
						</Card>

						<Card variant="flat">
							<CardBody compact>
								<div class="text-center">
									<div class="text-2xl font-bold text-warning-key">{{ cardLayoutStats.pending }}</div>
									<div class="text-sm text-neutral-60">Pending</div>
								</div>
							</CardBody>
						</Card>

						<Card variant="flat">
							<CardBody compact>
								<div class="text-center">
									<div class="text-2xl font-bold text-danger-key">{{ cardLayoutStats.inactive }}</div>
									<div class="text-sm text-neutral-60">Inactive</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</section>
		</div>

		<!-- THEME TOGGLE SECTION -->
		<div class="space-y-10 border-t pt-10">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">
						Theme Management
					</h1>
					<p class="text-gray-600 mt-2">
						Current theme: <span class="font-semibold">{{ currentTheme }}</span>
					</p>
				</div>
				<div class="flex items-center gap-4">
					<GThemeToggle />
					<div class="text-sm text-gray-600">
						Click the theme button to change themes
					</div>
				</div>
			</div>

			<!-- THEME EXAMPLES -->
			<section class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-800">
					Theme Examples
				</h2>
				<p class="text-gray-600">
					How different components look in various themes
				</p>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="space-y-4">
						<h3 class="text-lg font-medium text-gray-800">
							Form Controls
						</h3>
						<div class="space-y-3">
							<GInput
								v-model="themeExamples.input"
								label="Example Input"
								label-variant="floating"
								placeholder="Type something..."
							/>
							<GSwitch
								v-model="themeExamples.switch"
								:text="{ active: 'Enabled', inactive: 'Disabled' }"
							/>
							<GButton variant="primary">
								Primary Button
							</GButton>
						</div>
					</div>

					<div class="space-y-4">
						<h3 class="text-lg font-medium text-gray-800">
							Current Theme Info
						</h3>
						<div class="p-4 border rounded-lg space-y-2">
							<div class="flex justify-between">
								<span class="text-sm font-medium">Theme:</span>
								<span class="text-sm">{{ currentTheme }}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm font-medium">Dark Mode Active:</span>
								<span class="text-sm">{{ isDarkActive ? 'Yes' : 'No' }}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-sm font-medium">System Preference:</span>
								<span class="text-sm">{{ systemPreference ? 'Dark' : 'Light' }}</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useTheme } from './composables/useTheme';

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

// Switch examples
const switches = reactive({
	normal: false,
	small: false,
	customText: false,
});

// Settings examples
const settings = reactive({
	notifications: {
		email: true,
		push: false,
	},
	darkMode: false,
	analytics: false,
});

// Theme examples
const themeExamples = reactive({
	input: '',
	switch: false,
});

// Card examples
const cardStats = reactive({
	users: 1234,
	progress: 75,
});

const cardInteractive = reactive({
	isFavorite: false,
	inputValue: '',
	switchValue: false,
});

const cardLayoutStats = reactive({
	total: 1024,
	active: 892,
	pending: 87,
	inactive: 45,
});

// Theme management
const { theme: currentTheme, isDark: isDarkActive, setTheme } = useTheme();

// System preference detection
const systemPreference = computed(() => {
	if (typeof window !== 'undefined' && window.matchMedia) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return false;
});

// Switch event handlers
const onSwitchChange = (switchName: string, value: boolean) => {
	console.log(`${switchName} changed to:`, value);
};

const onSettingChange = (settingName: string, value: boolean) => {
	console.log(`Setting ${settingName} changed to:`, value);
};

const onThemeToggle = (value: boolean) => {
	console.log('Theme toggled to:', value ? 'dark' : 'light');
	setTheme(value ? 'dark' : 'light');
};

// Card event handlers
const onCardClick = (cardType: string) => {
	console.log(`${cardType} card clicked`);
};

const toggleFavorite = () => {
	cardInteractive.isFavorite = !cardInteractive.isFavorite;
};

const submitCardForm = () => {
	console.log('Card form submitted:', {
		input: cardInteractive.inputValue,
		switch: cardInteractive.switchValue,
	});
};

// Helper functions
const isValidEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
</script>
