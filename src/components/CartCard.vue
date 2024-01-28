<script setup>
import { useUserStore } from "@/stores/user";
import { Button } from "@/components/ui/button";
import { Minus, Plus, XCircleIcon } from "lucide-vue-next";
</script>

<template>
	<div class="card-item !px-0 bg-white">
		<div class="px-4">
			<div class="flex space-x-3 w-full">
				<a :href="link" class="w-[76px] h-[76px] flex-grow-0">
					<img
						class="object-scale-down"
						:src="cartItem.product.image"
						:alt="cartItem.product.name"
					/>
				</a>
				<div class="flex-1 flex flex-col">
					<div class="flex flex-col md:flex-row md:items-center md:space-x-6">
						<div class="flex-1">
							<a :href="link" class="text-md-start block">
								{{ cartItem.product.name }}
							</a>
							<div class="mt-2 !whitespace-normal h-[20px]"></div>
						</div>
						<div class="text-[20px] text-end text-secondary font-semibold">
							{{ cartItem.product.price }}$
						</div>
					</div>
					<div class="mt-2 flex items-center justify-between">
						<div class="number-input">
							<button class="number-input__btn" @click="decrement">
								<Minus />
							</button>

							<input
								class="number-input__input"
								min="1"
								:max="cartItem.product.quantity"
								inputmode="decimal"
								type="text"
								disabled
								:value="cartItem.quantity"
							/>

							<button class="number-input__btn" @click="increment">
								<Plus />
							</button>
						</div>

						<button
							class="flex items-center flex-grow-0 ml-2"
							@click="removeItem"
						>
							Remove
							<XCircleIcon class="w-4 h-4 ml-2" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CartCard",
	props: {
		cartItem: {
			type: Object,
			required: true,
		},
	},
	computed: {
		link() {
			return `/product/${this.cartItem.product.slug}`;
		},
	},
	methods: {
		updateQuantity() {
			const userStore = useUserStore();

			userStore
				.updateCartItem(this.cartItem.id, this.cartItem.quantity)
				.then((response) => {
					if (response.status === 200) {
						console.log("Updated");
					} else {
						console.log("Update failed");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},

		removeItem() {
			const userStore = useUserStore();

			userStore
				.removeCartItem(this.cartItem.id)
				.then((response) => {
					if (response.status === 200) {
						console.log("Removed");
					} else {
						console.log("Remove failed");
					}
				})
				.catch((err) => {
					console.log(err);
				});

			this.$emit("remove");
		},

		increment() {
			this.cartItem.quantity++;
			this.updateQuantity();
		},
		decrement() {
			if (this.cartItem.quantity > 1) {
				console.log(this.cartItem.quantity);
				this.cartItem.quantity--;
				console.log(this.cartItem.quantity);
				this.updateQuantity();
			}
		},
	},
};
</script>

<style>
li[role="status"] {
	flex-grow: 0;
}
</style>

<style scoped>
img {
	height: auto;
	max-width: 100%;
}

.number-input {
	align-items: center;
	display: inline-flex;
	border-style: solid;
	border-width: 1px;
	border-radius: 0.375rem;
	height: 40px;
	flex-grow: 0;
}

.number-input__btn {
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.number-input__input {
	width: 70px;
	text-align: center;
	border-style: solid;
	border-left-width: 1px;
	border-right-width: 1px;
}
</style>
