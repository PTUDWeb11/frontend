<script setup>
import { ref } from 'vue';
import { googleAuthCodeLogin } from 'vue3-google-login';
import config from '@/config';
import { Loader2 } from 'lucide-vue-next';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/toast/use-toast';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const { toast } = useToast();
const router = useRouter();
const userStore = useUserStore();

const isLoading = ref(false);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');

async function register(event) {
	event.preventDefault();
	isLoading.value = true;

	if (password.value !== confirmPassword.value) {
		toast({
			title: 'Login failed',
			description: 'Password and confirm password must be the same',
			variant: 'destructive',
		});

		// reset form
		password.value = '';
		confirmPassword.value = '';
		isLoading.value = false;

		return;
	}

	try {
		const resp = await fetch(`${config.APIEndpoint}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
				email: email.value,
				password: password.value,
			}),
		});

		const data = await resp.json();
		if (resp.status < 200 || resp.status >= 300) {
			throw new Error(data.message);
		}

		// save token to store
		userStore.login(data.token);

		toast({
			title: 'Register successfully',
			variant: 'success',
		});

		// redirect to redirect uri
		const redirectUri =
			new URLSearchParams(window.location.search).get('redirect') || '/';
		router.push(redirectUri);
	} catch (error) {
		console.log(error);
		toast({
			title: 'Register failed',
			description: error,
			variant: 'destructive',
		});
	}

	// reset form
	password.value = '';
	confirmPassword.value = '';
	isLoading.value = false;
}

const loginWithGoogle = async () => {
	isLoading.value = true;

	try {
		const res = await googleAuthCodeLogin();
		const resp = await fetch(`${config.APIEndpoint}/auth/google`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				code: res.code,
				redirectUri: config.RedirectURI,
			}),
		});

		const data = await resp.json();
		if (resp.status < 200 || resp.status >= 300) {
			throw new Error(data.message);
		}

		// save token to store
		userStore.login(data.token);

		toast({
			title: 'Login successfully',
			variant: 'success',
		});

		// redirect to redirect uri
		const redirectUri =
			new URLSearchParams(window.location.search).get('redirect') || '/';
		router.push(redirectUri);
	} catch (error) {
		console.log(error);
		toast({
			title: 'Login failed',
			description: error,
			variant: 'destructive',
		});
	}

	isLoading.value = false;
};
</script>

<template>
	<div :class="cn('grid gap-6', $attrs.class ?? '')">
		<form @submit="register">
			<div class="grid gap-2">
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input
						id="name"
						type="text"
						placeholder="Robert Downey Jr."
						v-model="name" />
				</div>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="m@example.com"
						v-model="email" />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" v-model="password" />
				</div>
				<div class="grid gap-2">
					<Label for="confirmPassword">Confirm Password</Label>
					<Input
						id="confirmPassword"
						type="password"
						v-model="confirmPassword" />
				</div>
				<Button :disabled="isLoading">
					<Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
					Sign In with Email
				</Button>
			</div>
		</form>
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t" />
			</div>
			<div class="relative flex justify-center text-xs uppercase">
				<span class="bg-background px-2 text-foreground">
					Or continue with
				</span>
			</div>
		</div>
		<Button
			variant="outline"
			type="button"
			:disabled="isLoading"
			@click="loginWithGoogle">
			<Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
			<svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
				<path
					fill="currentColor"
					d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
			</svg>
			Google
		</Button>
		<a :disabled="isLoading" as="button" href="/auth/login">
			<Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
			Already have an account? Login
		</a>
	</div>
</template>
