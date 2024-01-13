import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import vue3GoogleLogin from 'vue3-google-login';
import './assets/index.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.use(vue3GoogleLogin, {
	clientId:
		'462472722132-7dm0elokfg5pck4467h16q8mahv1njhi.apps.googleusercontent.com',
});

app.mount('#app');
