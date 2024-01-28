<template>
	<section id="section-product-suggestion">
		<h1 class="text-2xl font-semibold text-left">FOR YOU</h1>
		<div class="px-4 py-4 lg:px-9 lg:py-6">
			<div class="grid" :class="gridLayout">
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
	props: {
		categorySlug: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			loading: false,
			products: [],
		};
	},
	computed: {
		title() {
			if (this.categorySlug) {
				return "More like this";
			}
			return "FOR YOU";
		},
		gridLayout() {
			if (this.categorySlug) {
				return "grid-cols-2 md:grid-cols-4 xl:grid-cols-4";
			}
			return "grid-cols-2 md:grid-cols-4 xl:grid-cols-5";
		},
	},
	methods: {
		getDataFromApi() {
			this.loading = true;

			if (this.categorySlug) {
				Product.fetchByCategory(this.categorySlug)
					.then((response) => {
						this.products = response;
						this.loading = false;
					})
					.catch((error) => {
						console.log(error);
					});
				return;
			}

			Product.fetchAll()
				.then((response) => {
					this.products = response;
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
