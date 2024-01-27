<template>
	<div class="home p-10">
		<CategoriesNav />
		<img
			src="images/happy_new_year_banner.jpg"
			alt="Happy New Year Banner"
			class="w-4/6 h-64 object-cover mx-auto my-3"
		/>
		<PopularCategoriesSection />
	</div>
</template>

<script>
// @ is an alias to /src
import CategoriesNav from "@/components/CategoriesNav.vue";
import ProductCard from "@/components/ProductCard.vue";
import Product from "@/models/product";
import PopularCategoriesSection from "@/components/PopularCategoriesSection.vue";

export default {
	name: "HomeView",
	components: {
		CategoriesNav,
		ProductCard,
		PopularCategoriesSection,
	},
	data() {
		return {
			product: new Product(
				1,
				"ThinkBook 16p Gen 2 (AMD) ThinkBook 16p Gen 2 (AMD) ThinkBook 16p Gen 2 (AMD) ",
				1000,
				"Laptop",
				10,
				[
					"https://images.thinkgroup.vn/unsafe/460x460/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2022/7/27/ThinkBook-16p-NX-ARH-ThinkPro-01.jpg",
				],
				[]
			),
		};
	},
};
</script>
