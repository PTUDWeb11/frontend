<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue';

export default {
	name: 'RegisterView',
	components: {
		RegisterForm,
	},
};
</script>

<template>
	<div class="lg:p-8">
		<div
			class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">
					Create a new account
				</h1>
				<p class="text-sm text-foreground">
					Enter your email below to continue to your account.
				</p>
			</div>
			<RegisterForm />
			<p class="px-8 text-center text-sm text-foreground">
				By clicking continue, you agree to our
				<a
					href="/terms"
					class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a
					href="/privacy"
					class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</template>
