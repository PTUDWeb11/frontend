import { createPinia } from "pinia";
import { createApp } from "vue";
import vue3GoogleLogin from "vue3-google-login";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/grid.css";
import "vuestic-ui/styles/typography.css";
import 'vuestic-ui/dist/vuestic-ui.css'
import App from "./App.vue";
import "./assets/index.css";
import router from "./router";
import { createVuestic } from "vuestic-ui";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.use(vue3GoogleLogin, {
	clientId:
		"462472722132-7dm0elokfg5pck4467h16q8mahv1njhi.apps.googleusercontent.com",
});
app.use(createVuestic())
app.mount("#app");

