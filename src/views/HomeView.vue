<template>
	<div class="home p-10">
		<CategoriesNav :categories="categories" />
		<img
			src="images/happy_new_year_banner.jpg"
			alt="Happy New Year Banner"
			class="w-4/6 h-64 object-cover mx-auto my-3"
		/>
		<PopularCategoriesSection :categories="categories" class="mt-10" />
		<ProductSuggestionSection class="mt-20" />
	</div>
</template>

<script>
// @ is an alias to /src
import CategoriesNav from "@/components/CategoriesNav.vue";
import ProductCard from "@/components/ProductCard.vue";
import Product from "@/models/product";
import PopularCategoriesSection from "@/components/PopularCategoriesSection.vue";
import Category from "@/models/category";
import ProductSuggestionSection from "@/components/ProductSuggestionSection.vue";
export default {
	name: "HomeView",
	components: {
		CategoriesNav,
		ProductCard,
		PopularCategoriesSection,
		ProductSuggestionSection,
	},
	created() {
		this.getDataFromApi();
	},
	data() {
		return {
			loading: false,
			categories: [],
		};
	},
	methods: {
		getDataFromApi() {
			this.loading = true;
			Category.fetchAll()
				.then((response) => {
					this.categories = response;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
