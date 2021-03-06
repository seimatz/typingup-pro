// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import css from './assets/css/admin.css'
import css2 from './assets/css/game.css'
import VueGtag from "vue-gtag";

Vue.config.productionTip = false

//Google Tag Manager
Vue.use(VueGtag, {
  config: { id: "G-4RSTMK238Z" }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
