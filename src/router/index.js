import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AuthView from '../views/AuthView.vue';
import ProfileView from '../views/ProfileView.vue';
import AdminView from '../views/AdminView.vue';
import SearchView from '../views/SearchView.vue';
import ProductView from '../views/ProductView.vue';
import CategoryProductsView from '../views/CategoryProductsView.vue'; 

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/auth",
			name: "auth",
			component: AuthView,
			children: [
				{
					path: "login",
					name: "login",
					component: LoginView,
				},
				{
					path: "register",
					name: "register",
					component: RegisterView,
				},
			],
		},
		{
			path: "/profile",
			name: "profile",
			meta: {
				requiresAuth: true,
			},
			component: ProfileView,
		},
		{
			path: "/admin",
			name: "admin",
			meta: {
				requiresAuth: true,
				adminOnly: true,
			},
			component: AdminView,
		},
		{
			path: "/search",
			name: "Search",
			component: SearchView,
		},
		{
			path: "/cart",
			name: "cart",
			meta: {
				requiresAuth: true,
			},
			component: CartView,
		},
		{
			path: "/:category/:slug",
			name: "product",
			component: ProductView,
		},
		{
			path: '/categories/:category_id',
			name: 'CategoryProducts',
			component: CategoryProductsView
		}		
	],
});

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	const isLoggedIn = userStore.isLoggedIn;
	console.log(to.name, isLoggedIn);
	// redirect to 'redirect' if user is already logged in and tries to access login page
	if (to.name === "auth" && isLoggedIn) {
		// get redirect from query param or default to '/'
		const redirect = new URLSearchParams(to.query).get("redirect") || "/";
		next({ path: redirect });
	}
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!isLoggedIn) {
			next({
				name: "login",
				query: { redirect: to.fullPath },
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
