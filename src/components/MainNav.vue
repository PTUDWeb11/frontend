<script setup>
import { cn } from "@/lib/utils";
</script>

<template>
	<nav
		:class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
	>
		<a
			href="/cart"
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
		>
			Cart
		</a>
	</nav>
</template>

<script>
export default {
	name: "MainNav",
};
</script>
