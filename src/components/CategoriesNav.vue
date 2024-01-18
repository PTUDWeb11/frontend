<template>
	<div class="categories-nav">
		<h1 class="text-left font-semibold text-xl pb-4 border-b border-gray-200">
			DANH MỤC
		</h1>
		<div
			id="category-cards"
			class="max-h-96 shadow flex flex-wrap flex-col content-start pt-px pl-px"
		>
			<CategoryCard
				v-for="category in categories"
				:key="category.id"
				:category="category"
			/>
		</div>
	</div>
</template>

<script>
import CategoryCard from "@/components/CategoryCard.vue";
import Category from "@/models/category.js";

export default {
	name: "CategoriesNav",
	components: {
		CategoryCard,
	},
	data() {
		return {
			categories: Category.fetchAll(),
		};
	},
};
</script>
