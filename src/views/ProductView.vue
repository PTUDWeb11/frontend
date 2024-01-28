<script setup>
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user";

import { useToast } from "@/components/ui/toast/use-toast";
</script>

<template>
	<div v-if="loading == false" class="product-view p-10 lg:px-40">
		<h1 class="text-2xl font-semibold text-left">{{ product.name }}</h1>
		<section id="section-carousel">
			<div class="md:mx-20 lg:mx-40">
				<Carousel>
					<Slide v-for="image in product.images" :key="image">
						<img class="carousel__item" :src="image" :alt="product.name" />
					</Slide>
					<template #addons>
						<Navigation />
						<Pagination />
					</template>
				</Carousel>
			</div>
		</section>

		<section id="section-product-details" class="mt-10">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col justify-center">
					<h2 class="text-xl font-semibold text-left">Description</h2>
					<span class="whitespace-pre-line text-left">
						{{ product.description }}</span
					>
				</div>
				<div class="flex flex-col justify-start items-end lg:mx-40">
					<p
						class="text-secondary text-md-end max-h-10 m-0"
						v-if="product.quantity > 0"
					>
						Stock: {{ product.quantity }}
					</p>
					<h2
						class="text-xxl-end text-red-500 font-semibold text-left self-end max-h-[50px] m-0"
					>
						{{ product.price }}$
					</h2>
					<section id="section-buttons" class="mt-10">
						<div class="flex flex-row justify-end">
							<Button variant="outline" class="mr-10" @click="addItemToCart">
								Add to Cart
							</Button>
							<Button @click="handleBuyNow"> BUY NOW </Button>
						</div>
					</section>
				</div>
			</div>
		</section>

		<section id="section-suggestions" class="mt-10">
			<ProductSuggestionSection :product-slug="product.slug" />
		</section>
	</div>
</template>

<script>
import Product from "@/models/product";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import ProductSuggestionSection from "@/components/ProductSuggestionSection.vue";

export default {
	name: "ProductView",
	components: {
		Carousel,
		Navigation,
		Pagination,
		Slide,
		Button,
		ProductSuggestionSection,
	},
	data() {
		return {
			product: null,
			loading: true,
			error: null,
		};
	},
	methods: {
		getProduct() {
			this.loading = true;
			Product.getProductBySlug(this.$route.params.slug)
				.then((product) => {
					this.product = product;
					this.loading = false;
				})
				.catch((error) => {
					this.error = error;
					this.loading = false;
				});
		},
		addItemToCart() {
			const { toast } = useToast();
			const userStore = useUserStore();

			if (!userStore.isLoggedIn) {
				this.$router.push({ name: "login" });
				return;
			}

			userStore.addCartItem(this.product.id).then((response) => {
				if (response.status == 200) {
					toast({
						title: "Addded to cart!",
					});
					return;
				}
				toast({
					title: "Đã có lỗi xảy ra!",
					variant: "destructive",
				});
			});
		},
		handleBuyNow() {
			const userStore = useUserStore();
			if (!userStore.isLoggedIn) {
				this.$router.push({ name: "login" });
				return;
			}

			userStore.addCartItem(this.product.id).then((response) => {
				if (response.status != 200) {
					toast({
						title: "Đã có lỗi xảy ra!",
						variant: "destructive",
					});
					return;
				}
				this.$router.push({ name: "cart" });
			});
		},
	},
	created() {
		this.getProduct();
	},
};
</script>

<style scoped>
.carousel__item {
	height: 300px;
	min-height: 300px;
	border-radius: 8px;
	object-fit: scale-down;
}

.carousel__slide {
	padding: 10px;
}

.carousel__prev,
.carousel__next {
	box-sizing: content-box;
	border: 5px solid white;
}
</style>
