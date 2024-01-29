<script setup>
import { useUserStore } from '@/stores/user';
import { useToast } from '@/components/ui/toast/use-toast';
</script>

<template>
	<div class="cart-view p-10 bg-[#F6F9FC] h-screen">
		<main class="cart-main p-4">
			<h4 class="text-left font-semibold">Orders</h4>
			<div
				class="flex flex-wrap space-y-5 lg:flex-nowrap lg:space-x-5 lg:space-y-0">
				<div class="w-full lg:w-[60%] space-y-6">
					<OrderCard v-for="item in items" :key="item.id" :orderItem="item" />
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import OrderCard from '@/components/OrderCard.vue';

export default {
	name: 'OrderView',
	components: {
		OrderCard,
	},
	data() {
		return {
			items: [],
		};
	},
	methods: {
		getOrders() {
			const userStore = useUserStore();

			userStore
				.getUserOrders()
				.then((orderItems) => {
					this.items = orderItems;
					console.log(this.items);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	computed: {},
	created() {
		this.getOrders();
	},
};
</script>
