import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('admin-lte');
const feather = require('feather-icons');

