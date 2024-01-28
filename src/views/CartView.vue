<script setup>
import { useUserStore } from "@/stores/user";
</script>

<template>
	<div class="cart-view p-10 bg-[#F6F9FC] h-screen">
		<main class="cart-main p-4">
			<h4 class="text-left font-semibold">Cart ({{ count }})</h4>
			<div
				class="flex flex-wrap space-y-5 lg:flex-nowrap lg:space-x-5 lg:space-y-0"
			>
				<div class="w-full lg:w-[60%] space-y-6">
					<CartCard v-for="item in cart" :key="item.id" :cartItem="item" />
				</div>
				<div class="w-full lg:w-1/3 bg-white">
					<section class="section-order-bill p-[1.25rem]">
						<h5 class="font-semibold text-left">Your order</h5>
						<div class="flex justify-between text-sm-start pt-4 pb-2">
							<span>Total</span>
							<span class="text-[20px] text-end text-primary font-semibold"
								>{{ total }}$</span
							>
						</div>
						<button
							class="btn-create-order w-full px-[0.75rem] mt-3 h-11 text-white font-semibold rounded-md bg-primary hover:bg-primary-dark"
						>
							Place order
						</button>
					</section>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import CartCard from "@/components/CartCard.vue";

export default {
	name: "CartView",
	components: {
		CartCard,
	},
	data() {
		return {
			cart: [],
		};
	},
	methods: {
		getCart() {
			const userStore = useUserStore();

			userStore
				.getUserCart()
				.then((cartItems) => {
					this.cart = cartItems;
					console.log(this.cart);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	computed: {
		count() {
			return this.cart.reduce((acc, item) => acc + item.quantity, 0);
		},

		total() {
			return this.cart.reduce(
				(acc, item) => acc + item.product.price * item.quantity,
				0
			);
		},
	},
	created() {
		this.getCart();
	},
};
</script>
