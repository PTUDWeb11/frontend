<template>
	<div
		class="category-card w-1/12 h-44 pt-2 border-r border-b border-solid border-gray-200 hover:shadow-lg transition duration-300 ease-in-out"
	>
		<VaDropdown
			trigger="hover"
			hover-out-timeout="0"
			:offset="offset"
			class="p-px"
		>
			<template #anchor>
				<div class="flex flex-col h-full">
					<div class="h-4/6 mx-auto">
						<img
							class="max-h-full object-contain"
							:src="category.image"
							:alt="category.name"
						/>
					</div>
					<h3>{{ category.name }}</h3>
				</div>
			</template>

			<VaDropdownContent>
				<div class="flex flex-col">
					<a href="">
						<div
							v-for="subCategory in category.subCategories"
							:key="subCategory.id"
							class="px-2 py-2 border-b border-solid border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
						>
							{{ subCategory.name }}
						</div>
					</a>
				</div>
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
		offset: [-35, 0],
	}),
};
</script>
