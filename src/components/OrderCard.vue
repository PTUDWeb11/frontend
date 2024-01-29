<script setup>
import { useUserStore } from '@/stores/user';
import { Button } from '@/components/ui/button';
import { Minus, Plus, XCircleIcon } from 'lucide-vue-next';
</script>

<template>
	<div class="card-item !px-0 bg-white">
		<div class="px-4">
			<div class="flex space-x-3 w-full">
				<div class="flex-1 flex flex-col">
					<div class="flex flex-col md:flex-row md:items-center md:space-x-6">
						<div class="flex-1">
							<a :href="link" class="text-md-start block">
								#{{ orderItem.code }}
							</a>
							<div class="mt-2 !whitespace-normal h-[20px]"></div>
						</div>
						<div class="text-[20px] text-end text-secondary font-semibold">
							Total Price: {{ orderItem.totalPrice }}$
						</div>
						<Button> Process </Button>
						<Button> Cancel </Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OrderCard',
	props: {
		orderItem: {
			type: Object,
			required: true,
		},
	},
	computed: {
		link() {
			return `/orders/${this.orderItem.code}`;
		},
	},
	methods: {},
};
</script>

<style>
li[role='status'] {
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
