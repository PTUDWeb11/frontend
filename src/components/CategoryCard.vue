<script setup>
import { ChevronDown } from "lucide-vue-next";
</script>

<template>
	<div class="category-card w-full">
		<VaDropdown
			class="w-full"
			:trigger="dropdownTrigger"
			hover-out-timeout="0"
			:offset="offset"
		>
			<template #anchor>
				<div
					class="card-container flex flex-row items-center justify-center h-16 p-2 w-full"
				>
					<div class="aspect-square h-full">
						<img
							class="max-h-full object-scaledown m-auto"
							:src="category.image"
							:alt="category.name"
						/>
					</div>
					<h3 class="m-0 p-0">{{ category.name }}</h3>
					<template v-if="hasSubCategories">
						<ChevronDown class="min-w-4 min-h-4 w-4 h-4" />
					</template>
				</div>
			</template>

			<VaDropdownContent class="w-56">
				<template v-if="hasSubCategories">
					<div class="flex flex-col">
						<a href="">
							<div
								v-for="subCategory in category.subCategories"
								:key="subCategory.id"
								class="px-2 py-2 hover:bg-gray-100 transition duration-300 ease-in-out"
							>
								{{ subCategory.name }}
							</div>
						</a>
					</div>
				</template>
			</VaDropdownContent>
		</VaDropdown>
	</div>
</template>

<script>
import { VaDropdown, VaDropdownContent } from "vuestic-ui";

export default {
	name: "CategoryCard",
	components: {
		VaDropdown,
		VaDropdownContent,
	},
	props: {
		category: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		offset: [0, 0],
	}),
	computed: {
		hasSubCategories() {
			return this.category.subCategories.length > 0;
		},
		dropdownTrigger() {
			return this.hasSubCategories ? "hover" : "none";
		},
	},
};
</script>
