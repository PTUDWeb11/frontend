<script setup>
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const user = storeToRefs(userStore).user;

const router = useRouter();

function logout() {
	const userStore = useUserStore();
	userStore.logout();
	window.location.reload();
}

function profile() {
	router.push('/profile');
}

function admin() {
	router.push('/admin');
}

function order() {
	router.push('/orders');
}
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" class="relative h-8 w-8 rounded-full">
				<Avatar class="h-8 w-8">
					<AvatarImage :src="user.avatar" alt="avatar" />
					<AvatarFallback>AV</AvatarFallback>
				</Avatar>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56" align="end">
			<DropdownMenuLabel class="font-normal flex">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">{{ user.name }}</p>
					<p class="text-xs leading-none text-muted-foreground">
						{{ user.email }}
					</p>
				</div>
			</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem @click="profile">
					Profile
					<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem @click="admin" v-if="user.isAdmin">
					Admin
					<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem @click="order">
					Order
					<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="logout">
				Log out
				<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script>
export default {
	name: 'UserNav',
};
</script>
