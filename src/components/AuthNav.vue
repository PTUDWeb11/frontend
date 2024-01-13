<script setup>
import { cn } from '@/lib/utils';
</script>

<template>
	<nav
		:class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
		<a
			href="/auth/login"
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
			Login
		</a>
		<a
			href="/auth/register"
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
			Register
		</a>
	</nav>
</template>

<script>
export default {
	name: 'AuthNav',
};
</script>
