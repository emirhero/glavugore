// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

import router from './router'
import store from './store/store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)

import Rankings from '@/components/Rankings'

Vue.config.productionTip = false

// Mora biti dostupna globalno
Vue.component('rankings', Rankings)

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

