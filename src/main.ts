import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router/index'
const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()
createApp(App)
.use(vuetify)
.use(router)
.use(pinia)
.mount('#app')

