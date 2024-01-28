<template>
	<section class="section-product-suggestion">
		<h1 class="text-2xl font-semibold text-left">FOR YOU</h1>
		<div class="px-4 py-4 lg:px-9 lg:py-6">
			<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
				<ProductCard
					v-for="product in products"
					:product="product"
					:key="product.id"
				>
				</ProductCard>
			</div>
		</div>
	</section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import Product from "@/models/product";
export default {
	name: "ProductSuggestionSection",
	components: {
		ProductCard,
	},
	created() {
		this.getDataFromApi();
	},
	data() {
		return {
			loading: false,
			products: [],
		};
	},
	methods: {
		getDataFromApi() {
			this.loading = true;
			Product.fetchAll()
				.then((response) => {
					print(response);
					this.products = response;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
