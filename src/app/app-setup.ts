import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { pinia } from "./pinia-setup.ts";

const _app = createApp(App);

_app.use(pinia);

export const app = _app;
