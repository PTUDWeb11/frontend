<template>
	<div id="section-popular-categories">
		<h1 class="text-2xl font-semibold text-left">POPULAR CATEGORIES</h1>
		<div class="px-4 py-4 lg:px-9 lg:py-6">
			<div class="grid grid-cols-4 xl:grid-cols-8 gap-4">
				<LargeCategoryCard
					v-for="category in categories"
					:category="category"
					:key="category.id"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import LargeCategoryCard from "@/components/LargeCategoryCard.vue";
export default {
	name: "PopularCategoriesSection",
	components: {
		LargeCategoryCard,
	},
	props: {
		categories: {
			type: Array,
			required: true,
		},
	},
};
</script>
