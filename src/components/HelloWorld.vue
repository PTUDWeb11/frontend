<script setup>
import { Button } from '@/components/ui/button';
</script>

<template>
	<div class="hello">
		<Button>Click me</Button>

		<h1>{{ msg }}</h1>
		<p>
			For a guide and recipes on how to configure / customize this project,<br />
			check out the
			<a href="https://cli.vuejs.org" target="_blank" rel="noopener"
				>vue-cli documentation</a
			>.
		</p>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		msg: String,
	},
};
</script>
