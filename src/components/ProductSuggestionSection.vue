<template>
	<section id="section-product-suggestion">
		<h1 class="text-2xl font-semibold text-left">{{ title }}</h1>
		<div class="px-4 py-4 lg:px-9 lg:py-6">
			<div class="grid gap-4" :class="gridLayout">
				<ProductCard
					v-for="product in products"
					:product="product"
					:key="product.id"
				>
				</ProductCard>
			</div>
			<Pagination
				v-if="products.length > 0 && !loading"
				:totalItems="totalItems"
				:itemsPerPage="perPage"
				:currentPage="currentPage"
				@page-changed="onPageChange"
			/>
		</div>
	</section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import Product from "@/models/product";
import Pagination from "@/components/Pagination.vue";
export default {
	name: "ProductSuggestionSection",
	components: {
		ProductCard,
		Pagination,
	},
	created() {
		this.getDataFromApi();
	},
	props: {
		productSlug: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			loading: false,
			products: [],
			currentPage: 1,
			perPage: 8,
			totalItems: 0,
		};
	},
	computed: {
		title() {
			if (this.productSlug) {
				return "More like this";
			}
			return "FOR YOU";
		},
		gridLayout() {
			if (this.productSlug) {
				return "grid-cols-2 md:grid-cols-4 xl:grid-cols-4";
			}
			return "grid-cols-2 md:grid-cols-4 xl:grid-cols-5";
		},
	},
	methods: {
		getDataFromApi() {
			this.loading = true;

			if (this.productSlug) {
				Product.fetchRelatedProducts(this.productSlug, 1, this.perPage)
					.then((response) => {
						this.totalItems = response.count;
						this.products = response.products;
					})
					.catch((error) => {
						console.log(error);
					});
				this.loading = false;
				return;
			}

			Product.count()
				.then((response) => {
					this.totalItems = response;
				})
				.catch((error) => {
					console.log(error);
				});

			this.fetchProducts();

			this.loading = false;
		},
		onPageChange(newPage) {
			this.currentPage = newPage;
			this.fetchProducts();
		},
		fetchProducts() {
			this.loading = true;
			if (this.productSlug) {
				Product.fetchRelatedProducts(
					this.productSlug,
					this.currentPage,
					this.perPage
				)
					.then((response) => {
						this.totalItems = response.count;
						this.products = response.products;
					})
					.catch((error) => {
						console.log(error);
					});
				this.loading = false;
				return;
			}

			Product.fetchAll(this.currentPage, this.perPage)
				.then((response) => {
					this.products = response;
				})
				.catch((error) => {
					console.log(error);
				});
			this.loading = false;
		},
	},
};
</script>
