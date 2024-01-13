<script>
// @ is an alias to /src
import { RouterView } from 'vue-router';

export default {
	name: 'AuthView',
	components: {
		RouterView,
	},
};
</script>

<template>
	<div
		class="container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
		<div
			class="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
			<div class="absolute inset-0" />
			<div class="relative z-20 mt-auto">
				<blockquote class="space-y-2">
					<p class="text-lg">
						&ldquo;Whoever said money can't buy happiness simply didn't know
						where to go shopping.&rdquo;
					</p>
					<footer class="text-sm">Bo Derek</footer>
				</blockquote>
			</div>
		</div>
		<RouterView />
	</div>
</template>
