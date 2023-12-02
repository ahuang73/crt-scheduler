import './assets/main.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  VueCookies from 'vue-cookies'
const app = createApp(App)

app.use(router)
app.use(VueCookies)
app.mount('#app')
